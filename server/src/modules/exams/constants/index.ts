export const EXAM_TYPES = {
    LABORATORY: "Laboratory",
    IMAGING: "Imaging",
    CONSULTATION: "Consultation",
    PROCEDURE: "Procedure",
    OTHER: "Other"
} as const;

export const EXAM_TYPES_LIST = Object.values(EXAM_TYPES);

export const DURATION_TYPES = {
    HOURS: "hours",
    MINUTES: "minutes"
} as const;

export const DURATION_TYPES_LIST = Object.values(DURATION_TYPES);

export const RESULTS_TIME_TYPES = {
    MINUTES: "minutes",
    HOURS: "hours",
    DAYS: "days"
} as const;

export const RESULTS_TIME_TYPES_LIST = Object.values(RESULTS_TIME_TYPES);

export const PRIORITY_LEVELS_TYPES = {
    ROUTINE: "Routine",
    URGENT: "Urgent" 
} as const;

export const PRIORITY_LEVELS_LIST = Object.values(PRIORITY_LEVELS_TYPES);