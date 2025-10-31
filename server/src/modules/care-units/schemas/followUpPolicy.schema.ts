import { Schema } from "@root/core";
import { FOLLOW_UP_POLICY_APPLIES_TO } from "@root/modules/care-units/constants";

const followUpPolicySchema = Schema.objectField(true, {
    enabled: Schema.booleanField(true),
    delayDays: Schema.intField(true),
    isFree: Schema.booleanField(true),
    appliesTo: Schema.enumField([...FOLLOW_UP_POLICY_APPLIES_TO], true),
    exams: Schema.arrayField(false, Schema.stringField(true))
});

export default followUpPolicySchema;
export { followUpPolicySchema };