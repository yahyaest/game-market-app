import { errorBase } from "./errorBase";

export class missingAPIKey extends errorBase {
    constructor(message: string, cause?: any) {
        super("missingAPIKey", message, cause);
    }
}
