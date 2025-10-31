import { Service } from "@root/core";
import RoomModel, { IRoom } from "@root/modules/care-units/models/Room.model";
import RoomRepository from "@root/modules/care-units/repositories/Room.repository";

class RoomService extends Service<IRoom, RoomModel, RoomRepository> {
    public constructor() {
        const repository = new RoomRepository();
        super(repository);
    }
}

export { RoomService };
export default RoomService;