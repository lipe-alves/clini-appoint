import { Model, IModel } from "@root/core/index";
import { Int } from "@root/shared/types/index";
import { toDate, validateDate } from "@root/shared/utils/date";
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
import { InvalidInputFormatError } from "@root/shared/errors/index";

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

export { AppointmentModel, IAppointment };
export default AppointmentModel;