import { 
    BLOOD_TYPES_LIST,
    MARITAL_STATUS_LIST, 
    PERSON_ID_DOCUMENT_TYPES_LIST, 
    RELATIONSHIP_TYPES_LIST 
} from "@root/modules/patients/constants/index";

export type PersonIDDocumentType = typeof PERSON_ID_DOCUMENT_TYPES_LIST[number];

export interface PersonIDDocument {
    type: PersonIDDocumentType;
    value: string;
}

export type MaritalStatus = typeof MARITAL_STATUS_LIST[number];

export type Relationship = typeof RELATIONSHIP_TYPES_LIST[number];

export type BloodType = typeof BLOOD_TYPES_LIST[number];
