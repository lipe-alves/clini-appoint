import { Model, IModel } from "@root/core/index";

import Schema, { SchemaConfig } from "@root/core/Schema";

import { Gender } from "@root/shared/types/index";
import { GENDER_LIST } from "@root/shared/constants/index";

import { toDate } from "@root/shared/utils/date";
import { removeWhitespaces } from "@root/shared/utils/string";

import { 
    HealthProfessionalType, 
    HealthProfessionalRegistrationType 
} from "@root/modules/health-professionals/types/index";
import { 
    HEALTH_PROFESSIONALS_TYPES_LIST, 
    HEALTH_PROFESSIONAL_REGISTRATION_TYPES_LIST 
} from "@root/modules/health-professionals/constants/index";

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

const healthProfessionalSchema: SchemaConfig = {
    firstName: Schema.stringField(true),
    lastName: Schema.stringField(true),
    birthdate: Schema.dateField(true),
    gender: Schema.enumField([...GENDER_LIST], true),
    preferredLanguage: Schema.stringField(false),
    type: Schema.enumField([...HEALTH_PROFESSIONALS_TYPES_LIST], true),
    customType: Schema.stringField(false),
    specialties: Schema.arrayField(true, Schema.stringField(true)),
    registration: Schema.objectField(true, {
        type: Schema.enumField([...HEALTH_PROFESSIONAL_REGISTRATION_TYPES_LIST], true),
        value: Schema.stringField(true),
        country: Schema.stringField(true),
        state: Schema.stringField(false),
        issuingAgency: Schema.stringField(false),
    }),
    education: Schema.objectField(true, {
        degrees: Schema.arrayField(true, Schema.stringField(true)),
        licenses: Schema.arrayField(true, Schema.stringField(true)),
        certifications: Schema.arrayField(true, Schema.stringField(true)),
        yearsOfExperience: Schema.numericField(false),
        languagesSpoken: Schema.arrayField(true, Schema.stringField(true)),
    }),
    contacts: Schema.objectField(true, {
        phone: Schema.cellphoneField(true),
        email: Schema.emailField(true),
    }),
    availability: Schema.objectField(true, {
        acceptsInsurance: Schema.booleanField(true),
        telemedicine: Schema.booleanField(true),
        languages: Schema.arrayField(true, Schema.stringField(true)),
        workingHours: Schema.arrayField(true, Schema.objectField(true, {
            weekday: Schema.numericField(true),
            start: Schema.stringField(true),
            end: Schema.stringField(true),
        })),
    }),
};

class HealthProfessionalModel<T extends IHealthProfessional = IHealthProfessional> extends Model<T> implements IHealthProfessional {
    public constructor(data: T, schema: SchemaConfig = healthProfessionalSchema) {
        super(data, { ...healthProfessionalSchema, ...schema });
    }

    protected parse(data: any): T {
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

    public get fullName() {
        return removeWhitespaces(`${this.firstName} ${this.lastName}`);
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
}

export { HealthProfessionalModel, IHealthProfessional, healthProfessionalSchema };
export default HealthProfessionalModel;