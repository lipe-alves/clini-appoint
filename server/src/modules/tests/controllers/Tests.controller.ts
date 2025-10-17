import Controller from "@root/core/Controller";

class TestsController extends Controller {
    public ping() {
        this.success("Pong!", {
            date: new Date(),
            headers: this.request.headers,
            body: this.request.body,
            params: this.request.params,
            query: this.request.query
        });
    }

    public async execute(func: string) {
        if (func === "ping") {
            this.ping();
        }
    }
}

export { TestsController };
export default TestsController;