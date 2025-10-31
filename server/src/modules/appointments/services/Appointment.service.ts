import { Service } from "@root/core";
import { sumTime } from "@root/shared/utils/date";

import CreateAppointmentDto from "@root/modules/appointments/dtos/CreateAppointment.dto";
import AppointmentRepository from "@root/modules/appointments/repositories/Appointment.repository";

import CareUnitService from "@root/modules/care-units/services/CareUnit.service";
import RoomService from "@root/modules/care-units/services/Room.service";
import PatientService from "@root/modules/patients/services/Patient.service";
import ExamService from "@root/modules/exams/services/Exam.service";
import HealthProfessionalService from "@root/modules/health-professionals/services/HealthProfessional.service";

import AppointmentModel, { IAppointment } from "@root/modules/appointments/models/Appointment.model";
import ExamModel from "@root/modules/exams/models/Exam.model";
import PatientModel from "@root/modules/patients/models/Patient.model";
import HealthProfessionalModel from "@root/modules/health-professionals/models/HealthProfessional.model";
import RoomModel from "@root/modules/care-units/models/Room.model";

import { 
    ResourceNotFoundError, 
    EntityRelationshipMismatchError, 
    RequiredFieldError 
} from "@root/shared/errors";
import { 
    AgeRestrictionError, 
    GenderRestrictionError, 
    SpecialtyRestrictionError,
    RoomOperatingHoursError
} from "@root/modules/appointments/errors";

import { WEEKDAYS_INDEXES } from "@root/modules/care-units/constants";
import { MM, HH } from "@root/modules/care-units/types";
import { ID } from "@root/shared/types";

class AppointmentService extends Service<IAppointment, AppointmentModel, AppointmentRepository> {
    private readonly careUnitService: CareUnitService;
    private readonly roomService: RoomService;
    private readonly patientService: PatientService;
    private readonly examService: ExamService;
    private readonly healthProfessionalService: HealthProfessionalService; 
    
    public constructor(services: {
        careUnitService: CareUnitService;
        roomService: RoomService;
        patientService: PatientService;
        examService: ExamService;
        healthProfessionalService: HealthProfessionalService;
    }) {
        const appointmentRepository = new AppointmentRepository();
        super(appointmentRepository);

        this.careUnitService = services.careUnitService;
        this.roomService = services.roomService;
        this.patientService = services.patientService;
        this.examService = services.examService;
        this.healthProfessionalService = services.healthProfessionalService;
    }

    private validateExamsRestrictions(patient: PatientModel, exams: ExamModel[]) {
        for (const exam of exams) {
            if ((exam.minAge || exam.maxAge)) {
                if (!patient.age) {
                    throw new AgeRestrictionError(patient, exam);
                }

                if (exam.minAge && patient.age < exam.minAge) {
                    throw new AgeRestrictionError(patient, exam);
                }

                if (exam.maxAge && patient.age > exam.maxAge) {
                    throw new AgeRestrictionError(patient, exam);
                }
            }

            if (exam.genders) {
                if (!patient.gender) {
                    throw new GenderRestrictionError(patient, exam);
                }
                
                if (!exam.genders.includes(patient.gender)) {
                    throw new GenderRestrictionError(patient, exam);
                }
            }
        }
    }

    private validateHealthProfessionalSpecialties(professional: HealthProfessionalModel, exams: ExamModel[]) {
        let specialties: string[] = [];

        for (const exam of exams)
            specialties.push(...exam.specialties);

        specialties = Array.from(new Set([...specialties]));

        const suitable = professional.specialties.some(specialty => specialties.includes(specialty));
        if (!suitable) throw new SpecialtyRestrictionError(professional, specialties);
    }
    
    private validateRoomOperatingHours(room: RoomModel, start: Date, end: Date) {
        const appointmentWeekday = start.getDay();

        for (const operatingHour of room.operatingHours) {
            const weekdayIndex = WEEKDAYS_INDEXES[operatingHour.weekday];
            if (weekdayIndex !== appointmentWeekday) continue;

            const [openHour, openMinute] = operatingHour.openTime.split(":") as [hh: HH, mm: MM];
            const [closeHour, closeMinute] = operatingHour.closeTime.split(":") as [hh: HH, mm: MM];
            
            const openTime = new Date(start);
            openTime.setHours(Number(openHour), Number(openMinute), 0, 0);

            const closeTime = new Date(start);
            closeTime.setHours(Number(closeHour), Number(closeMinute), 0, 0);

            if (start >= openTime && end <= closeTime)
                return;
        }

        throw new RoomOperatingHoursError(room, start);
    }

    private async findOverlappingAppointments(params: {
        room: RoomModel;
        professional: HealthProfessionalModel;
        patient: PatientModel;
        start: Date;
        end: Date;
    }) {
        const {
            room,
            professional,
            patient, 
            start,
            end
        } = params;

        const appointmentsSameProfessional = await this.repository
            .where("healthProfessional.id", "==", professional.id)
            .and("start", "<=", end)
            .and("end", ">=", start)
    }

    private calculateAppointmentEndDate(start: Date, exams: ExamModel[]): Date {
        let end = new Date(start.getTime()); 

        for (const exam of exams) {
            end = sumTime(end, exam.duration.value, exam.duration.type);
        }

        return end;
    }

    public async create(data: CreateAppointmentDto): Promise<AppointmentModel> {
        const careUnit = await this.careUnitService.getById(data.careUnitId);
        if (!careUnit) throw new ResourceNotFoundError("Care unit", "id", data.careUnitId);

        const room = await this.roomService.getById(data.roomId);
        if (!room) throw new ResourceNotFoundError("Room", "id", data.roomId);
        if (room.careUnitId !== careUnit.id) {
            throw new EntityRelationshipMismatchError(
                { type: "Room", label: `${room.name} (${room.id})` },
                { type: "Care Unit", label: `${careUnit.name} (${careUnit.id})` }
            );
        }
        
        const patient = await this.patientService.getById(data.patientId);
        if (!patient) throw new ResourceNotFoundError("Patient", "id", data.patientId);

        data.examIds = Array.from(new Set([...data.examIds]));
        const exams = await this.examService.where("id", "in", data.examIds).list();

        if (exams.length === 0) throw new RequiredFieldError("exams");
        if (exams.length !== data.examIds.length) {
            const existingExamIds = exams.map(ex => ex.id);
            const nonExistingExamIds = data.examIds.filter(id => !existingExamIds.includes(id));
            
            throw new ResourceNotFoundError("Exams", "ids", nonExistingExamIds);
        }

        const healthProfessional = await this.healthProfessionalService.getById(data.healthProfessionalId);
        if (!healthProfessional) throw new ResourceNotFoundError("Health Professional", "id", data.healthProfessionalId);

        this.validateHealthProfessionalSpecialties(healthProfessional, exams);
        this.validateExamsRestrictions(patient, exams);
        
        const expectedEnd = this.calculateAppointmentEndDate(data.start, exams);
        this.validateRoomOperatingHours(room, data.start, expectedEnd);
        
        const overlappingAppointmentIds = await this.findOverlappingAppointments();
    }
}

export default AppointmentService;
export { AppointmentService };