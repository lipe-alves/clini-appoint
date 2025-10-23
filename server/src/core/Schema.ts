import { InvalidInputFormatError, RequiredFieldError } from "../shared/errors/index";
import { validateDate } from "../shared/utils/date";
import { isId, isNumeric, validateEmail } from "../shared/utils/formats";
import { removeWhitespaces } from "../shared/utils/string";

type PropertyType = 
    | "date" 
    | "id"
    | "string"
    | "number"
    | "float"
    | "int"
    | "object"
    | "email"
    | "cellphone"
    | "numeric"
    | "array"
    | "boolean";

interface PropertyConfigs {
    type: PropertyType;
    required: boolean;
    minLength?: number;
    maxLength?: number;
    properties?: SchemaConfig;
    itemsType?: PropertyConfigs;
    possibleStrings?: string[];
}

interface SchemaConfig {
    [property: string]: PropertyConfigs;
}

class Schema {
    public static cellphoneField(required = true): PropertyConfigs {
        return { type: "cellphone", required };
    }

    public static emailField(required = true): PropertyConfigs {
        return { type: "email", required };
    }

    public static stringField(required = true): PropertyConfigs {
        return { type: "string", required };
    }

    public static enumField(possibleStrings: string[], required = true): PropertyConfigs {
        return { type: "string", required, possibleStrings };
    }

    public static idField(required = true): PropertyConfigs {
        return { type: "id", required };
    }

    public static dateField(required = true): PropertyConfigs {
        return { type: "date", required };
    }

    public static objectField(required = true, properties?: SchemaConfig): PropertyConfigs {
        return { type: "object", required, properties };
    }

    public static arrayField(required = true, itemsType?: PropertyConfigs): PropertyConfigs {
        return { type: "array", required, itemsType };
    }

    public static booleanField(required = true): PropertyConfigs {
        return { type: "boolean", required };
    }

    public static numericField(required = true): PropertyConfigs {
        return { type: "numeric", required };
    }

    public static intField(required = true): PropertyConfigs {
        return { type: "int", required };
    }

    public static numberField(required = true): PropertyConfigs {
        return { type: "number", required };
    }

    public static floatField(required = true): PropertyConfigs {
        return { type: "float", required };
    }

    public static validate(data: any, schema: SchemaConfig): void {
        for (const [key, config] of Object.entries(schema)) {  
            if (typeof data[key] === "undefined" || data[key] === null) {
                if (config.required) {
                    throw new RequiredFieldError(key);
                }
                
                continue;
            }

            switch (config.type) {
                case "array":
                    if (!Array.isArray(data[key])) {
                        throw new InvalidInputFormatError(key, ["array"]);
                    }
                    if (config.itemsType) {
                        for (let i = 0; i < data[key].length; i++) {
                            const itemKey = `${key}[${i}]`;
                            const item = data[key][i];
                            this.validate({ [itemKey]: item }, { [itemKey]: config.itemsType });
                        }
                    }
                    break;
                case "boolean":
                    if (typeof data[key] !== "boolean") {
                        throw new InvalidInputFormatError(key, ["boolean"]);
                    }
                    break;
                case "id":
                    if (typeof data[key] !== "string" || !isId(data[key])) {
                        throw new InvalidInputFormatError(key, ["id"]);
                    }
                    break;
                case "int":
                    if (typeof data[key] !== "number" || !Number.isInteger(data[key])) {
                        throw new InvalidInputFormatError(key, ["int"]);
                    }
                    break;
                case "cellphone": 
                case "numeric":
                    if (typeof data[key] !== "string" || !isNumeric(data[key])) {
                        throw new InvalidInputFormatError(key, ["numeric"]);
                    }
                    break;
                case "date":
                    if (!validateDate(data[key])) {
                        throw new InvalidInputFormatError(key, ["date"]);
                    }
                    break;
                case "number":
                case "float":
                    if (typeof data[key] !== "number") {
                        throw new InvalidInputFormatError(key, [config.type]);
                    }
                    break;
                case "string":
                    if (typeof data[key] !== "string" || !removeWhitespaces(data[key])) {
                        throw new InvalidInputFormatError(key, ["string"]);
                    }
                    if (config.possibleStrings) {
                        if (!config.possibleStrings.includes(data[key])) {
                            throw new InvalidInputFormatError(key, [...config.possibleStrings]);
                        }
                    }
                    break;
                case "object":
                    if (typeof data[key] !== "object" || data[key] === null || Array.isArray(data[key])) {
                        throw new InvalidInputFormatError(key, ["object"]);
                    }
                    if (config.properties) {
                        this.validate(data[key], config.properties);
                    }
                    break;
                case "email":
                    if (typeof data[key] !== "string" || !validateEmail(data[key])) {
                        throw new InvalidInputFormatError(key, ["email"]);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

export { Schema, SchemaConfig, PropertyConfigs, PropertyType };
export default Schema;