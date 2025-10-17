import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import app from "./app";

setGlobalOptions({ maxInstances: 10 });

export const api = onRequest(app);
