import { ICareUnit } from "@root/modules/care-units/models/CareUnit.model";
import { IRoom } from "@root/modules/care-units/models/Room.model";
import { IExam } from "@root/modules/exams/models/Exam.model";
import { IHealthProfessional } from "@root/modules/health-professionals/models/HealthProfessional.model";
import { IPatient } from "@root/modules/patients/models/Patient.model";
import { 
    APPOINTMENT_TYPES_LIST,
    APPOINTMENT_STATUS_LIST, 
    PAYMENT_METHOD_LIST, 
    PAYMENT_STATUS_LIST, 
    PAYMENT_TYPE_LIST,
    CARE_UNIT_SUMMARY_FIELDS, 
    ROOM_SUMMARY_FIELDS,
    PATIENT_SUMMARY_FIELDS,
    HEALTH_PROFESSIONAL_SUMMARY_FIELDS,
    EXAM_SUMMARY_FIELDS,
    PRIORITY_LEVELS
} from "@root/modules/appointments/constants";

export type AppointmentType = typeof APPOINTMENT_TYPES_LIST[number];
export type AppointmentStatus = typeof APPOINTMENT_STATUS_LIST[number];
export type PaymentType = typeof PAYMENT_TYPE_LIST[number];
export type PaymentMethod = typeof PAYMENT_METHOD_LIST[number];
export type PaymentStatus = typeof PAYMENT_STATUS_LIST[number];
export type CareUnitSummary = Pick<ICareUnit, typeof CARE_UNIT_SUMMARY_FIELDS[number]>;
export type RoomSummary = Pick<IRoom, typeof ROOM_SUMMARY_FIELDS[number]>;
export type PatientSummary = Pick<IPatient, typeof PATIENT_SUMMARY_FIELDS[number]>;
export type HealthProfessionalSummary = Pick<IHealthProfessional, typeof HEALTH_PROFESSIONAL_SUMMARY_FIELDS[number]>;
export type ExamSummary = Pick<IExam, typeof EXAM_SUMMARY_FIELDS[number]>;
export type PriorityLevel = typeof PRIORITY_LEVELS[number];