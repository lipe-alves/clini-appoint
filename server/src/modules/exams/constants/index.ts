export const EXAM_TYPES = {
    LABORATORY: "Laboratory" as const,
    IMAGING: "Imaging" as const,
    CONSULTATION: "Consultation" as const,
    PROCEDURE: "Procedure" as const,
    OTHER: "Other" as const
};

export const EXAM_TYPES_LIST = Object.values(EXAM_TYPES);

export const DURATION_TYPES = {
    HOURS: "hours" as const,
    MINUTES: "minutes" as const
};

export const DURATION_TYPES_LIST = Object.values(DURATION_TYPES);

export const PRIORITY_LEVELS_TYPES = {
    ROUTINE: "Routine" as const,
    URGENT: "Urgent" as const
};

export const PRIORITY_LEVELS_LIST = Object.values(PRIORITY_LEVELS_TYPES);