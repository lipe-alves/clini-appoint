export type PersonIDDocumentType = "CPF" | "SSN" | "NationalID";

export interface PersonIDDocument {
    type: PersonIDDocumentType;
    value: string;
}

export type MaritalStatus = "NeverMarried" | "Married" | "Widowed" | "Divorced" | "Separated" | "CommonLawMarriage" | "DeFactoMaritalStatus";

export type Relationship = "Partner" | "Sibling" | "Parent" | "Friend" | "Other";

export type BloodType = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
