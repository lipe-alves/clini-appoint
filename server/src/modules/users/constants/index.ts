export const USER_ROLES_TYPES = {
    ADMIN: "admin" as const,
    DEV: "dev" as const,
    PATIENT: "patient" as const,
    HEALTH_PROFESSIONAL: "health-professional" as const
};


export const USER_ROLES_LIST = Object.values(USER_ROLES_TYPES);