import { Model, IModel, Schema, SchemaConfig } from "@root/core/index";

import { ID, Int } from "@root/shared/types/index";
import { toDate } from "@root/shared/utils/date";

import { 
    AppointmentType,
    AppointmentStatus,
    PaymentMethod,
    PaymentType,
    PaymentStatus,
    CareUnitSummary,
    RoomSummary,
    PatientSummary,
    HealthProfessionalSummary,
    ExamSummary,
    PriorityLevel
} from "@root/modules/appointments/types/index";
import { 
    APPOINTMENT_TYPES_LIST,
    APPOINTMENT_STATUS_LIST, 
    PAYMENT_STATUS_LIST, 
    PAYMENT_TYPE_LIST, 
    PAYMENT_METHOD_LIST,
    CARE_UNIT_SUMMARY_FIELDS, 
    ROOM_SUMMARY_FIELDS,
    PATIENT_SUMMARY_FIELDS,
    HEALTH_PROFESSIONAL_SUMMARY_FIELDS,
    EXAM_SUMMARY_FIELDS,
    PRIORITY_LEVELS
} from "@root/modules/appointments/constants";

import { careUnitSchema } from "@root/modules/care-units/models/CareUnit.model";
import { roomSchema } from "@root/modules/care-units/models/Room.model";
import { patientSchema } from "@root/modules/patients/models/Patient.model";
import { healthProfessionalSchema } from "@root/modules/health-professionals/models/HealthProfessional.model";
import { examSchema } from "@root/modules/exams/models/Exam.model";

interface IAppointment extends IModel {
    name: string;
    description?: string;
    observation?: string;
    type: AppointmentType;
    status: AppointmentStatus;
    careUnit: CareUnitSummary;
    room: RoomSummary;
    patient: PatientSummary;
    healthProfessional: HealthProfessionalSummary;
    exams: ExamSummary[];
    examIds: ID[];
    examRequests?: {
        examId: ID;
        priority: PriorityLevel;
        scheduledAppointmentId?: ID;
        notes?: string;
    }[];
    start: Date;
    end: Date;
    payment: {
        status: PaymentStatus;
        type?: PaymentType;
        amount: Int;
        private?: {
            method: PaymentMethod;
            currency: string;
            transactionId?: string;
        };
        insurance?: {
            providerName: string;
            cardNumber: string;
            expirationDate?: Date;
            authorizationCode?: string;
            coverage?: {
                examId: ID;
                covered: boolean;
                notes?: string;
            }[];
        };
    };
}

const appointmentSchema: SchemaConfig = {
    name: Schema.stringField(true),
    description: Schema.stringField(false),
    observation: Schema.stringField(false),
    type: Schema.enumField([...APPOINTMENT_TYPES_LIST], true),
    status: Schema.enumField([...APPOINTMENT_STATUS_LIST], true),
    careUnit: Schema.pick([...CARE_UNIT_SUMMARY_FIELDS], careUnitSchema),
    room: Schema.pick([...ROOM_SUMMARY_FIELDS], roomSchema),
    patient: Schema.pick([...PATIENT_SUMMARY_FIELDS], patientSchema),
    healthProfessional: Schema.pick([...HEALTH_PROFESSIONAL_SUMMARY_FIELDS], healthProfessionalSchema),
    exams: Schema.arrayField(true, Schema.pick([...EXAM_SUMMARY_FIELDS], examSchema)),
    examRequests: Schema.arrayField(false, Schema.objectField(true, {
        examId: Schema.idField(true),
        priority: Schema.enumField([...PRIORITY_LEVELS], true),
        scheduledAppointmentId: Schema.idField(false),
        notes: Schema.stringField(false)
    })),
    start: Schema.dateField(true),
    end: Schema.dateField(true),
    payment: Schema.objectField(true, {
        status: Schema.enumField([...PAYMENT_STATUS_LIST], true),
        type: Schema.enumField([...PAYMENT_TYPE_LIST], false),
        amount: Schema.intField(true),
        private: Schema.objectField(false, {
            method: Schema.enumField([...PAYMENT_METHOD_LIST], true),
            currency: Schema.stringField(true),
            transactionId: Schema.stringField(false)
        }),
        insurance: Schema.objectField(false, {
            providerName: Schema.stringField(true),
            cardNumber: Schema.stringField(true),
            expirationDate: Schema.dateField(false),
            authorizationCode: Schema.stringField(false),
            coverage: Schema.arrayField(false, Schema.objectField(true, {
                examId: Schema.idField(true),
                covered: Schema.booleanField(true),
                notes: Schema.stringField(false)
            }))
        })
    })
};

class AppointmentModel extends Model<IAppointment> implements IAppointment {
    public get name() {
        return this.data.name;
    }

    public get description() {
        return this.data.description;
    }

    public get observation() {
        return this.data.observation;
    }

    public get type() {
        return this.data.type;
    }

    public get status() {
        return this.data.status;
    }

    public get careUnit() {
        return this.data.careUnit;
    }

    public get room() {
        return this.data.room;
    }

    public get patient() {
        return this.data.patient;
    }

    public get healthProfessional() {
        return this.data.healthProfessional;
    }

    public get exams() {
        return this.data.exams;
    }

    public get examIds() {
        return this.data.examIds;
    }

    public get examRequests() {
        return this.data.examRequests;
    }

    public get start() {
        return this.data.start;
    }

    public get end() {
        return this.data.end;
    }

    public get payment() {
        return this.data.payment;
    }

    protected parse(data: any): IAppointment {
        data = super.parse(data);
        data.start = toDate(data.start);
        data.end = toDate(data.end);
        return data;
    }
}

export { AppointmentModel, IAppointment, appointmentSchema };
export default AppointmentModel;