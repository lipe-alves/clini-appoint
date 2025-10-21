import { ExamType } from "@root/modules/exams/types/index";

export type FollowUpPolicyAppliesTo = "All" | "SpecificExams" | ExamType;

export interface FollowUpPolicy {
    enabled: boolean;
    delayDays: number;
    isFree: boolean;
    appliesTo: FollowUpPolicyAppliesTo;
    exams?: string[];
}