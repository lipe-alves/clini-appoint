export const GENDER_TYPES = {
    MALE: "Male" as const,
    FEMALE: "Female" as const,
    NON_BINARY: "NonBinary" as const,
    OTHER: "Other" as const,
};

export const GENDER_LIST = Object.values(GENDER_TYPES);