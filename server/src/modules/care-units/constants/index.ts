import { EXAM_TYPES_LIST } from "@root/modules/exams/constants";

export const FOLLOW_UP_POLICY_APPLIES_TO = [
    "All",
    "SpecificExams",
    ...EXAM_TYPES_LIST
] as const;

export const ATTENDANCE_MODE_TYPES = {
    SCHEDULED: "Scheduled",
    WALK_IN: "WalkIn"
} as const;

export const ATTENDANCE_MODE_LIST = Object.values(ATTENDANCE_MODE_TYPES);

export const WEEKDAYS = {
    SUNDAY: "Sunday",
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
} as const;

export const WEEKDAYS_LIST = Object.values(WEEKDAYS);

export const WEEKDAYS_INDEXES = {
    [WEEKDAYS.SUNDAY]: 0,
    [WEEKDAYS.MONDAY]: 1,
    [WEEKDAYS.TUESDAY]: 2,
    [WEEKDAYS.WEDNESDAY]: 3,
    [WEEKDAYS.THURSDAY]: 4,
    [WEEKDAYS.FRIDAY]: 5,
    [WEEKDAYS.SATURDAY]: 6,
} as const;