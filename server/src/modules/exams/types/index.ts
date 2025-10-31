import { 
    EXAM_TYPES_LIST,
    DURATION_TYPES_LIST,
    RESULTS_TIME_TYPES_LIST
} from "@root/modules/exams/constants/index";
import { Int } from "@root/shared/types/index";

export type ExamType = typeof EXAM_TYPES_LIST[number];
export type DurationType = typeof DURATION_TYPES_LIST[number];
export type ResultsTime = typeof RESULTS_TIME_TYPES_LIST[number];
export interface FollowUpPolicy {
    enabled: boolean;
    delayDays: Int;
    isFree: boolean;
}