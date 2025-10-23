import { Gender, ID } from "@root/shared/types/index";
import { GENDER_LIST } from "@root/shared/constants/index";

export function isNumeric(input: string): boolean {
    return /^\d+$/.test(input);
}

export function isId(input: string): input is ID {
    return isNumeric(input);
}

export function isCpf(input: string): boolean {
    input = input.replace(/\D/g, "").trim();
    return input.length === 11;
}

export function isGender(input: string): input is Gender {
    return GENDER_LIST.includes(input as any);
}

export function validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}