import { Model, IModel } from "@root/core/index";
import { Gender } from "@root/shared/types/index";
import { PersonIDDocument, MaritalStatus, Relationship, BloodType } from "@root/modules/patients/types/index";
import { toDate } from "@root/shared/utils/index";

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
        note: string;
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

class PatientModel extends Model<IPatient> implements IPatient {
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

    public get additionalConsiderations() {
        return this.data.additionalConsiderations;
    }

    protected parse(data: any): IPatient {
        data = super.parse(data);
        data.birthdate = toDate(data.birthdate);
        return data;
    }

    public validate(): boolean {
        return true;
    }
}

export { PatientModel, IPatient };
export default PatientModel;