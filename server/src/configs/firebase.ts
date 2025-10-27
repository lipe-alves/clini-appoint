import * as admin from "firebase-admin";
import * as fs from "node:fs";
import * as path from "node:path";

const serviceAccount: admin.ServiceAccount = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./service-account.json"), "utf-8")
);
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = app.firestore();
firestore.settings({
    ignoreUndefinedProperties: true
});

export { firestore, app };