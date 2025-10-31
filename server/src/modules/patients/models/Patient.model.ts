import { Model, IModel } from "@root/core/index";
import { Gender } from "@root/shared/types/index";
import { PersonIDDocument, MaritalStatus, Relationship, BloodType } from "@root/modules/patients/types/index";

import { GENDER_LIST } from "@root/shared/constants/index";
import { 
    BLOOD_TYPES_LIST, 
    MARITAL_STATUS_LIST,
    PERSON_ID_DOCUMENT_TYPES_LIST, 
    RELATIONSHIP_TYPES_LIST 
} from "@root/modules/patients/constants/index";

import { toDate } from "@root/shared/utils/date";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IPatient extends IModel {
    firstName: string;
    lastName: string;
    document: PersonIDDocument;
    birthdate?: Date;
    gender?: Gender;
    maritalStatus?: MaritalStatus;
    preferredLanguage?: string;
    contactInfo: {
        phoneNumbers: string[];
        email: string;
        address: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        },
        emergencyContact: {
            name: string;
            relationship: Relationship;
            phone: string;
        };
    };
    medicalInfo: {
        primaryCarePhysician?: string;
        allergies: string[];
        currentMedications: string[];
        chronicConditions: string[];
        pastSurgeries: string[];
        familyMedicalHistory: string[];
        bloodType?: BloodType;
    };
    additionalConsiderations: {
        note?: string;
        culturalOrReligious: {
            religion?: string;
            dietaryRestrictions: string[];
            modestyPreferences: {
                prefersSameGenderProvider: boolean;
            };
            prayerNeeds: {
                requiresQuietSpace: boolean;
                prayerTimes?: string[];
            }
        };
        mentalHealthHistory: string[];
        disabilityStatus?: string;
        advanceDirectives: {
            hasLivingWill: boolean;
            organDonor: boolean;
        };
    };
}

const patientSchema: SchemaConfig = {
    firstName: Schema.stringField(true),
    lastName: Schema.stringField(true),
    document: Schema.objectField(true, {
        type: Schema.enumField([...PERSON_ID_DOCUMENT_TYPES_LIST], true),
        value: Schema.numericField(true)
    }),
    birthdate: Schema.dateField(true),
    gender: Schema.enumField([...GENDER_LIST], false),
    maritalStatus: Schema.enumField([...MARITAL_STATUS_LIST], false),
    preferredLanguage: Schema.stringField(false),
    contactInfo: Schema.objectField(true, {
        phoneNumbers: Schema.arrayField(true, Schema.cellphoneField(true)),
        email: Schema.emailField(true),
        address: Schema.objectField(true, {
            street: Schema.stringField(true),
            city: Schema.stringField(true),
            state: Schema.stringField(true),
            postalCode: Schema.stringField(true),
            country: Schema.stringField(true),
        }),
        emergencyContact: Schema.objectField(true, {
            name: Schema.stringField(true),
            relationship: Schema.enumField([...RELATIONSHIP_TYPES_LIST], true),
            phone: Schema.cellphoneField(true),
        }),
    }),
    medicalInfo: Schema.objectField(true, {
        primaryCarePhysician: Schema.stringField(false),
        allergies: Schema.arrayField(true, Schema.stringField(true)),
        currentMedications: Schema.arrayField(true, Schema.stringField(true)),
        chronicConditions: Schema.arrayField(true, Schema.stringField(true)),
        pastSurgeries: Schema.arrayField(true, Schema.stringField(true)),
        familyMedicalHistory: Schema.arrayField(true, Schema.stringField(true)),
        bloodType: Schema.enumField([...BLOOD_TYPES_LIST], false)
    }),
    additionalConsiderations: Schema.objectField(true, {
        note: Schema.stringField(false),
        culturalOrReligious: Schema.objectField(true, {
            religion: Schema.stringField(false),
            dietaryRestrictions: Schema.arrayField(true, Schema.stringField(true)),
            modestyPreferences: Schema.objectField(true, {
                prefersSameGenderProvider: Schema.booleanField(true)
            }),
            prayerNeeds: Schema.objectField(true, {
                requiresQuietSpace: Schema.booleanField(true),
                prayerTimes: Schema.arrayField(false, Schema.stringField(true))
            })
        }),
        mentalHealthHistory: Schema.arrayField(true, Schema.stringField(true)),
        disabilityStatus: Schema.stringField(false),
        advanceDirectives: Schema.objectField(true, {
            hasLivingWill: Schema.booleanField(true),
            organDonor: Schema.booleanField(true)
        })
    })
};

class PatientModel extends Model<IPatient> implements IPatient {
    public constructor(data: IPatient) {
        super(data, patientSchema);
    }

    protected parse(data: any): IPatient {
        data = super.parse(data);
        data.birthdate = toDate(data.birthdate);
        return data;
    }

    public get firstName() {
        return this.data.firstName;
    }

    public get lastName() {
        return this.data.lastName;
    }

    public get document() {
        return this.data.document;
    }

    public get birthdate() {
        return this.data.birthdate;
    }

    public get gender() {
        return this.data.gender;
    }

    public get maritalStatus() {
        return this.data.maritalStatus;
    }

    public get contactInfo() {
        return this.data.contactInfo;
    }

    public get medicalInfo() {
        return this.data.medicalInfo;
    }

    public get isUniversalDonor() {
        return this.medicalInfo.bloodType === "O-";
    }

    public get isUniversalRecipient() {
        return this.medicalInfo.bloodType === "AB+";
    }

    public get age() {
        if (!this.birthdate) return undefined;

        const currYear = new Date().getFullYear();
        const birthYear = this.birthdate.getFullYear();

        return currYear - birthYear;
    }

    public get additionalConsiderations() {
        return this.data.additionalConsiderations;
    }
}

export { PatientModel, IPatient, patientSchema };
export default PatientModel;