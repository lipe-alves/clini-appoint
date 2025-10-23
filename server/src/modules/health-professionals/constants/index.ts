export const HEALTH_PROFESSIONALS_TYPES = {
    PHYSICIAN: "Physician" as const,
    PSYCHOLOGIST: "Psychologist" as const,
    NUTRITIONIST: "Nutritionist" as const,
    PHYSICAL_THERAPIST: "PhysicalTherapist" as const,
    DENTIST: "Dentist" as const,
    SOCIAL_WORKER: "SocialWorker" as const,
    PSYCHIATRIST: "Psychiatrist" as const,
    OTHER: "Other" as const
};

export const HEALTH_PROFESSIONALS_TYPES_LIST = Object.values(HEALTH_PROFESSIONALS_TYPES);

export const HEALTH_PROFESSIONAL_REGISTRATION_TYPES = {
    CRM: "CRM" as const,
    NPI: "NPI" as const,
    DEA: "DEA" as const,
    StateMedicalLicense: "StateMedicalLicense" as const,
    CRP: "CRP" as const,
    CRN: "CRN" as const,
    CREFITO: "CREFITO" as const
};

export const HEALTH_PROFESSIONAL_REGISTRATION_TYPES_LIST = Object.values(HEALTH_PROFESSIONAL_REGISTRATION_TYPES);