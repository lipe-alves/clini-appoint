export type ExamType = "Laboratory" | "Imaging" | "Consultation" | "Procedure" | "Other";
export type DurationType = "minutes" | "hours";
export type PriorityLevel = "Routine" | "Urgent";
export interface FollowUpPolicy {
    enabled: boolean;
    delayDays: number;
    isFree: boolean;
}