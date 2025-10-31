export const APPOINTMENT_TYPES = {
    CONSULTATION: "Consultation",
    EXAM_SESSION: "ExamSession",
    FOLLOW_UP: "FollowUp",
} as const;

export const APPOINTMENT_TYPES_LIST = Object.values(APPOINTMENT_TYPES);

export const APPOINTMENT_STATUS_TYPES = {
    SCHEDULED: "Scheduled" as const,
    CANCELLED: "Cancelled" as const,
    NO_SHOW: "NoShow" as const,
    WAITING: "Waiting" as const,
    IN_CONSULTATION: "InConsultation" as const,
    CONSULTED: "Consulted" as const,
    RESCHEDULED: "Rescheduled" as const,
    CHECKED_IN: "CheckedIn" as const,
    CHECKED_OUT: "CheckedOut" as const
};

export const APPOINTMENT_STATUS_LIST = Object.values(APPOINTMENT_STATUS_TYPES);

export const PAYMENT_TYPE_TYPES = {
    INSURANCE: "Insurance" as const,
    PRIVATE: "Private" as const,
    FREE: "Free" as const,
    COMPANY: "Company" as const
};

export const PAYMENT_TYPE_LIST = Object.values(PAYMENT_TYPE_TYPES);

export const PAYMENT_METHOD_TYPES = {
    CREDIT_CARD: "CreditCard" as const,
    DEBIT_CARD: "DebitCard" as const,
    BANK_TRANSFER: "BankTransfer" as const,
    BANK_SLIP: "BankSlip" as const,
    CASH: "Cash" as const,
    PIX: "Pix" as const,
    PAYPAL: "PayPal" as const,
    APPLE_PAY: "ApplePay" as const,
    GOOGLE_PAY: "GooglePay" as const,
    CRYPTO: "Crypto" as const
};

export const PAYMENT_METHOD_LIST = Object.values(PAYMENT_METHOD_TYPES);

export const PAYMENT_STATUS_TYPES = {
    PENDING: "Pending" as const,
    PAID: "Paid" as const,
    AUTHORIZED: "Authorized" as const,
    DECLINED: "Declined" as const,
    REFUNDED: "Refunded" as const
};

export const PAYMENT_STATUS_LIST = Object.values(PAYMENT_STATUS_TYPES);

export const CARE_UNIT_SUMMARY_FIELDS = [
    "id",
    "clinicId",
    "name",
    "description"
] as const;

export const ROOM_SUMMARY_FIELDS = [
    "id",
    "careUnitId",
    "name",
    "description",
    "followUpPolicy",
    "operatingHours"
] as const;

export const PATIENT_SUMMARY_FIELDS = [ 
    "id",
    "firstName",
    "lastName",
    "document",
] as const;

export const HEALTH_PROFESSIONAL_SUMMARY_FIELDS = [ 
    "id",
    "type",
    "customType",
    "firstName",
    "lastName",
    "registration",
] as const;

export const EXAM_SUMMARY_FIELDS = [ 
    "id",
    "name",
    "followUpPolicy",
    "duration",
    "resultsTime",
    "description",
    "preparation",
] as const;

export const PRIORITY_LEVELS = [
    "Routine",
    "Urgent"
] as const;