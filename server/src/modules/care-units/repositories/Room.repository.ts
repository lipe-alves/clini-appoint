import { Repository } from "@root/core/index";
import RoomModel, { IRoom } from "@root/modules/care-units/models/Room.model";

class RoomRepository extends Repository<IRoom, RoomModel> {
    public constructor() {
        super("rooms", RoomModel);
    }
}

export default RoomRepository;
export { RoomRepository };