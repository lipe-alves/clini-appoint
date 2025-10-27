import { ServerError } from "@root/core";

class WrongEmailOrPassword extends ServerError {
    public constructor() {
        super(404, "Wrong email or password.", "ERR_USER_NOT_FOUND");
    }
}

export { WrongEmailOrPassword };
export default WrongEmailOrPassword;