import { Int } from "@root/shared/types/index";
import { Schema, SchemaConfig, OrderByDirection, WhereFilter, WHERE_FILTERS, ORDER_BY_DIRECTIONS } from "@root/core/index";

interface QueryModelsDto {
    filters: {
        field: string;
        op: WhereFilter;
        value: string;
    }[];
    order: {
        field: string;
        direction: OrderByDirection;
    };
    pagination: {
        page: Int;
        size: Int;
    };
}

const queryModelsDtoSchema: SchemaConfig = {
    filters: Schema.arrayField(true, Schema.objectField(true, {
        field: Schema.stringField(true),
        op: Schema.enumField([...WHERE_FILTERS], true),
        value: Schema.stringField(true)
    })),
    order: Schema.objectField(true, {
        field: Schema.stringField(true),
        direction: Schema.enumField([...ORDER_BY_DIRECTIONS], true)
    }),
    pagination: Schema.objectField(true, {
        page: Schema.numericField(true),
        size: Schema.numericField(true)
    })
};

function validateQueryModelsDto(data: any): data is QueryModelsDto {
    Schema.validate(data, queryModelsDtoSchema);
    return true;
}

export { QueryModelsDto, queryModelsDtoSchema, validateQueryModelsDto };
export default QueryModelsDto;