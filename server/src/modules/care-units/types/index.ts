import { ATTENDANCE_MODE_LIST, FOLLOW_UP_POLICY_APPLIES_TO } from "@root/modules/care-units/constants";

export type FollowUpPolicyAppliesTo = typeof FOLLOW_UP_POLICY_APPLIES_TO[number];

export interface FollowUpPolicy {
    enabled: boolean;
    delayDays: number;
    isFree: boolean;
    appliesTo: FollowUpPolicyAppliesTo;
    exams?: string[];
}

export type AttendanceMode = typeof ATTENDANCE_MODE_LIST[number];