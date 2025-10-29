// Appointment Status
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

// Payment Type
export const PAYMENT_TYPE_TYPES = {
    INSURANCE: "Insurance" as const,
    PRIVATE: "Private" as const,
    FREE: "Free" as const,
    COMPANY: "Company" as const
};

export const PAYMENT_TYPE_LIST = Object.values(PAYMENT_TYPE_TYPES);

// Payment Method
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

// Payment Status
export const PAYMENT_STATUS_TYPES = {
    PENDING: "Pending" as const,
    PAID: "Paid" as const,
    AUTHORIZED: "Authorized" as const,
    DECLINED: "Declined" as const,
    REFUNDED: "Refunded" as const
};

export const PAYMENT_STATUS_LIST = Object.values(PAYMENT_STATUS_TYPES);
