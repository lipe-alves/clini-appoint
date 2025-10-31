import { ServerError } from "@root/core/index";

class EntityRelationshipMismatchError extends ServerError {
    public constructor(
        entityA: {
            type: string;
            label: string;    
        }, 
        entityB: {
            type: string;
            label: string;    
        }
    ) {
        super(
            400, 
            `${entityA.type} "${entityA.label}" does not belong to ${entityB.type} "${entityB.label}"'.`, 
            "ERR_ENTITY_MISMATCH"
        );
    }
}

export { EntityRelationshipMismatchError };
export default EntityRelationshipMismatchError;