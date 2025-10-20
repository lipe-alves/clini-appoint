export type CompanyIDDocumentType = "CNPJ" | "EIN";

export interface CompanyIDDocument {
    type: CompanyIDDocumentType;
    value: string;
}