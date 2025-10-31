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
