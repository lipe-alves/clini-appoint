import { ICareUnit } from "@root/modules/care-units/models/CareUnit.model";
import { IRoom } from "@root/modules/care-units/models/Room.model";
import { IExam } from "@root/modules/exams/models/Exam.model";
import { IHealthProfessional } from "@root/modules/health-professionals/models/HealthProfessional.model";
import { IPatient } from "@root/modules/patients/models/Patient.model";

export type AppointmentStatus = 
    | "Scheduled"
    | "Cancelled"
    | "NoShow"
    | "Waiting"
    | "InConsultation"
    | "Consulted"
    | "Rescheduled"
    | "CheckedIn"
    | "CheckedOut";
export type PaymentType = 
    | "Insurance" 
    | "Private" 
    | "Free" 
    | "Company";
export type PaymentMethod = 
    | "CreditCard"
    | "DebitCard"
    | "BankTransfer"
    | "BankSlip"
    | "Cash"
    | "Pix"
    | "PayPal"
    | "ApplePay"
    | "GooglePay"
    | "Crypto";
export type PaymentStatus = 
    | "Pending" 
    | "Paid" 
    | "Authorized"
    | "Declined"
    | "Refunded";

export type CareUnitSummary = Pick<ICareUnit, "id" | "clinicId" | "name" | "description">;
export type RoomSummary = Pick<IRoom, "id" | "careUnitId" | "name" | "description" | "followUpPolicy" | "operatingHours">;
export type PatientSummary = Pick<IPatient, "id" | "firstName" | "lastName" | "document">;
export type HealthProfessionalSummary = Pick<IHealthProfessional, "id" | "type" | "customType" | "firstName" | "lastName" | "registration">;
export type ExamSummary = Pick<IExam, "id" | "name" | "followUpPolicy" | "duration" | "resultsTime" | "description" | "preparation">;