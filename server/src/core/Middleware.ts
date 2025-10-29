import { Controller } from "./Controller";

abstract class Middleware extends Controller {
    public abstract execute(err?: any): Promise<void>;
}

export default Middleware;
export { Middleware };