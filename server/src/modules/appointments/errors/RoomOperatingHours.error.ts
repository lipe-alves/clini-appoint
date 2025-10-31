import { ServerError } from "@root/core/index";
import { WEEKDAYS_LIST } from "@root/modules/care-units/constants";
import RoomModel from "@root/modules/care-units/models/Room.model";

class RoomOperatingHoursError extends ServerError {
    public constructor(room: RoomModel, appointmentDate: Date) {
        const appointmentWeekday = WEEKDAYS_LIST[appointmentDate.getDay()];
        const formattedDate = appointmentDate.toLocaleDateString("en-US");

        const message = `Room "${room.name}" (ID ${room.id}) is not available on ${appointmentWeekday} (${formattedDate}). ` +
                        `Please choose a date when the room is operating.`;

        super(400, message, "ERR_ROOM_OPERATING_HOURS");
    }
}

export { RoomOperatingHoursError };
export default RoomOperatingHoursError;
``