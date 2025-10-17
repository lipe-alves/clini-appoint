import { Model, IModel } from "@root/core/index";
import { Gender } from "@root/shared/types/index";
import { HealthProfessionalType, HealthProfessionalRegistrationType } from "@root/modules/health-professionals/types/index";
import { toDate } from "@root/shared/utils/index";

interface IHealthProfessional extends IModel {
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: Gender;
    preferredLanguage?: string;
    type: HealthProfessionalType;
    customType?: string;
    specialties: string[];
    registration: {
        type: HealthProfessionalRegistrationType;
        value: string;
        country: string;
        state?: string;
        issuingAgency?: string;
    };
    education: {
        degrees: string[];
        licenses: string[];
        certifications: string[];
        yearsOfExperience?: number;
        languagesSpoken: string[];
    };
    contacts: {
        phone: string;
        email: string;
    };
    availability: {
        acceptsInsurance: boolean;
        telemedicine: boolean;
        languages: string[];
        workingHours: {
            weekday: number;
            start: string;
            end: string;
        }[];
    };
}

class HealthProfessionalModel<T extends IHealthProfessional = IHealthProfessional> extends Model<T> implements IHealthProfessional {
    public get firstName() {
        return this.data.firstName;
    }

    public get lastName() {
        return this.data.lastName;
    }

    public get birthdate() {
        return this.data.birthdate;
    }

    public get gender() {
        return this.data.gender;
    }

    public get preferredLanguage() {
        return this.data.preferredLanguage;
    }

    public get type() {
        return this.data.type;
    }

    public get customType() {
        return this.data.customType;
    }

    public get specialties() {
        return this.data.specialties;
    }

    public get registration() {
        return this.data.registration;
    }

    public get education() {
        return this.data.education;
    }

    public get contacts() {
        return this.data.contacts;
    }
    
    public get availability() {
        return this.data.availability;
    }

    protected parse(data: any): T {
        data = super.parse(data);
        data.birthdate = toDate(data.birthdate);
        return data;
    }

    public validate(): boolean {
        return true;
    }
}

export { HealthProfessionalModel, IHealthProfessional };
export default HealthProfessionalModel;