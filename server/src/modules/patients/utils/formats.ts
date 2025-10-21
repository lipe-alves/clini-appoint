import { MARITAL_STATUS_LIST } from "@root/modules/patients/constants/index";
import { MaritalStatus } from "@root/modules/patients/types/index";

export function isMaritalStatus(input: string): input is MaritalStatus {
    return MARITAL_STATUS_LIST.includes(input as any);
}