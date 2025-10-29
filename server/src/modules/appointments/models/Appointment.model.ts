import { Model, IModel, Schema, SchemaConfig } from "@root/core/index";

import { Int } from "@root/shared/types/index";
import { toDate, validateDate } from "@root/shared/utils/date";
import { InvalidInputFormatError } from "@root/shared/errors/index";

import { 
    AppointmentStatus,
    PaymentMethod,
    PaymentType,
    PaymentStatus,
    CareUnitSummary,
    RoomSummary,
    PatientSummary,
    HealthProfessionalSummary,
    ExamSummary 
} from "@root/modules/appointments/types/index";
import { 
    APPOINTMENT_STATUS_LIST, 
    PAYMENT_STATUS_LIST, 
    PAYMENT_TYPE_LIST, 
    PAYMENT_METHOD_LIST 
} from "@root/modules/appointments/constants";

import { careUnitSchema } from "@root/modules/care-units/models/CareUnit.model";

interface IAppointment extends IModel {
    name: string;
    description?: string;
    observation?: string;
    status: AppointmentStatus;
    careUnit: CareUnitSummary;
    room: RoomSummary;
    patient: PatientSummary;
    healthProfessional: HealthProfessionalSummary;
    exam: ExamSummary;
    start: Date;
    end: Date;
    payment: {
        status: PaymentStatus;
        type: PaymentType;
        amount: Int;
        private?: {
            method: PaymentMethod;
            currency: string;
            transactionId?: string;
        };
        insurance?: {
            providerName: string;
            cardNumber: string;
            expirationDate?: Date;
            authorizationCode?: string;
            coverage?: {
                examId: string;
                covered: boolean;
                notes?: string;
            }[];
        };
    };
}

const appointmentSchema: SchemaConfig = {
    name: Schema.stringField(true),
    description: Schema.stringField(false),
    observation: Schema.stringField(false),
    status: Schema.enumField([...APPOINTMENT_STATUS_LIST], true),
    careUnit: Schema.pick([
        "id", 
        "clinicId",
        "name",
        "description"
    ], careUnitSchema),
    room: Schema.objectField(true, {
        id: Schema.idField(true),
        careUnitId: Schema.idField(true),
        name: Schema.stringField(true),
        number: Schema.stringField(false)
    }),
    patient: Schema.objectField(true, {
        id: Schema.stringField(true),
        fullName: Schema.stringField(true),
        document: Schema.stringField(true)
    }),
    healthProfessional: Schema.objectField(true, {
        id: Schema.stringField(true),
        fullName: Schema.stringField(true),
        specialty: Schema.stringField(false)
    }),
    exam: Schema.objectField(true, {
        id: Schema.stringField(true),
        name: Schema.stringField(true),
        code: Schema.stringField(false)
    }),
    start: Schema.dateField(true),
    end: Schema.dateField(true),
    payment: Schema.objectField(true, {
        status: Schema.enumField([...PAYMENT_STATUS_LIST], true),
        type: Schema.enumField([...PAYMENT_TYPE_LIST], true),
        amount: Schema.intField(true),
        private: Schema.objectField(false, {
            method: Schema.enumField([...PAYMENT_METHOD_LIST], true),
            currency: Schema.stringField(true),
            transactionId: Schema.stringField(false)
        }),
        insurance: Schema.objectField(false, {
            providerName: Schema.stringField(true),
            cardNumber: Schema.stringField(true),
            expirationDate: Schema.dateField(false),
            authorizationCode: Schema.stringField(false),
            coverage: Schema.arrayField(false, Schema.objectField(true, {
                examId: Schema.stringField(true),
                covered: Schema.booleanField(true),
                notes: Schema.stringField(false)
            }))
        })
    })
};

class AppointmentModel extends Model<IAppointment> implements IAppointment {
    public get name() {
        return this.data.name;
    }

    public get description() {
        return this.data.description;
    }

    public get observation() {
        return this.data.observation;
    }

    public get status() {
        return this.data.status;
    }

    public get careUnit() {
        return this.data.careUnit;
    }

    public get room() {
        return this.data.room;
    }

    public get patient() {
        return this.data.patient;
    }

    public get healthProfessional() {
        return this.data.healthProfessional;
    }

    public get exam() {
        return this.data.exam;
    }

    public get start() {
        return this.data.start;
    }

    public get end() {
        return this.data.end;
    }

    public get payment() {
        return this.data.payment;
    }

    protected parse(data: any): IAppointment {
        data = super.parse(data);
        data.start = toDate(data.start);
        data.end = toDate(data.end);
        return data;
    }

    protected validate(): void {
        super.validate();

        if (!validateDate(this.data.start)) {
            throw new InvalidInputFormatError("start", ["date"]);
        }

        if (!validateDate(this.data.end)) {
            throw new InvalidInputFormatError("end", ["date"]);
        }
    }
}

export { AppointmentModel, IAppointment, appointmentSchema };
export default AppointmentModel;