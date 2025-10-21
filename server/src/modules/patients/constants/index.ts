export const MARITAL_STATUS_TYPES = {
    NEVER_MARRIED: "NeverMarried" as const,
    MARRIED: "Married" as const, 
    WIDOWED: "Widowed" as const, 
    DIVORCED: "Divorced" as const, 
    SEPARATED: "Separated" as const, 
    COMMON_LAW_MARRIAGE: "CommonLawMarriage" as const, 
    DE_FACTO_MARITAL_STATUS: "DeFactoMaritalStatus" as const
};

export const MARITAL_STATUS_LIST = Object.values(MARITAL_STATUS_TYPES);

export const PERSON_ID_DOCUMENT_TYPES = {
    CPF: "CPF" as const, 
    SSN: "SSN" as const,
    NATIONAL_ID: "NationalID" as const
};

export const PERSON_ID_DOCUMENT_TYPES_LIST = Object.values(PERSON_ID_DOCUMENT_TYPES);

export const RELATIONSHIP_TYPES = {
    PARTNER: "Partner",
    SIBLING: "Sibling",
    PARENT: "Parent",
    FRIEND: "Friend",
    OTHER: "Other"
};

export const RELATIONSHIP_TYPES_LIST = Object.values(RELATIONSHIP_TYPES);

export const BLOOD_TYPES_LIST = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;