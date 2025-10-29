import { Model, IModel } from "@root/core/index";
import { CompanyIDDocument } from "@root/modules/clinics/types/index";

interface IClinic extends IModel {
    corporateName: string;
    tradeName: string;
    document: CompanyIDDocument;
    description?: string;
    contacts: {
        phone: string;
        email: string;
    };
    database: string;
}

class ClinicModel extends Model<IClinic> implements IClinic {
    public get corporateName() {
        return this.data.corporateName;
    }

    public get tradeName() {
        return this.data.tradeName;
    }

    public get document() {
        return this.data.document;
    }

    public get description() {
        return this.data.description;
    }

    public get contacts() {
        return this.data.contacts;
    }

    public get database() {
        return this.data.database;
    }

    public set database(database: string) {
        this.data.database = database;
    }

    protected parse(data: any): IClinic {
        data = super.parse(data);
        data.document.value = data.document.value.replace(/\D/g, "");
        return data;
    }

    public validate(): boolean {
        return true;
    }
}

export { ClinicModel, IClinic };
export default ClinicModel;