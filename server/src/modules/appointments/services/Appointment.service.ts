import { Service } from "@root/core";

import AppointmentModel, { IAppointment } from "@root/modules/appointments/models/Appointment.model";
import AppointmentRepository from "@root/modules/appointments/repositories/Appointment.repository";
import CreateAppointmentDto from "@root/modules/appointments/dtos/CreateAppointment.dto";
import { AgeRestrictionError, GenderRestrictionError } from "@root/modules/appointments/errors";

import CareUnitService from "@root/modules/care-units/services/CareUnit.service";
import RoomService from "@root/modules/care-units/services/Room.service";
import PatientService from "@root/modules/patients/services/Patient.service";
import ExamService from "@root/modules/exams/services/Exam.service";

import ExamModel from "@root/modules/exams/models/Exam.model";
import PatientModel from "@root/modules/patients/models/Patient.model";

import { 
    ResourceNotFoundError, 
    EntityRelationshipMismatchError, 
    RequiredFieldError 
} from "@root/shared/errors";

class AppointmentService extends Service<IAppointment, AppointmentModel, AppointmentRepository> {
    private readonly careUnitService: CareUnitService;
    private readonly roomService: RoomService;
    private readonly patientService: PatientService;
    private readonly examService: ExamService;
    
    public constructor(services: {
        careUnitService: CareUnitService;
        roomService: RoomService;
        patientService: PatientService;
        examService: ExamService;
    }) {
        const appointmentRepository = new AppointmentRepository();
        super(appointmentRepository);

        this.careUnitService = services.careUnitService;
        this.roomService = services.roomService;
        this.patientService = services.patientService;
        this.examService = services.examService;
    }

    private checkExamsRestrictions(patient: PatientModel, exams: ExamModel[]) {
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

    private checkDateAvailability() {
        
    }

    private calculateAppointmentDurationMs(exams: ExamModel[]) {
        let totalMs = 0;

        for (const exam of exams) {
            const ms = exam.duration.type
        }

        return totalMs;
    }

    public findAvailableDates() {

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

        const exams = await this.examService.where("id", "in", data.examIds).list();
        if (exams.length === 0) throw new RequiredFieldError("exams");
        if (exams.length !== data.examIds.length) {
            const existingExamIds = exams.map(ex => ex.id);
            const nonExistingExamIds = data.examIds.filter(id => !existingExamIds.includes(id));
            
            throw new ResourceNotFoundError("Exams", "ids", nonExistingExamIds);
        }

        this.checkExamsRestrictions(patient, exams);

        const expectedDuration = this.calculateAppointmentDurationMs(exams);
    }
}

export default AppointmentService;
export { AppointmentService };