import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";
import { HEALTH_PROFESSIONALS_TYPES_LIST } from "@root/modules/health-professionals/constants/index";
import CreateSpecialtyDto from "@root/modules/specialties/dtos/CreateSpecialty.dto";

import Schema, { SchemaConfig } from "@root/core/Schema";
import { generateId } from "@root/shared/utils/index";
import { removeWhitespaces } from "@root/shared/utils/string";

import { Model, IModel } from "@root/core/index";

interface ISpecialty extends IModel {
    name: string;
    description?: string;
    professionalType: HealthProfessionalType;
}

const specialtySchema: SchemaConfig = {
    name: Schema.stringField(true),
    description: Schema.stringField(false),
    professionalType: Schema.enumField([...HEALTH_PROFESSIONALS_TYPES_LIST], false)
};

class SpecialtyModel extends Model<ISpecialty> implements ISpecialty {
    public constructor(data: ISpecialty) {
        super(data, specialtySchema);
    }

    protected parse(data: any): ISpecialty {
        data.name = removeWhitespaces(data.name);
        if (data.description) data.description = removeWhitespaces(data.description);
        return data;
    }
    
    public get name() {
        return this.data.name;
    }

    public get description() {
        return this.data.description;
    }

    public get professionalType() {
        return this.data.professionalType;
    }
}

export { SpecialtyModel, ISpecialty, specialtySchema };
export default SpecialtyModel;