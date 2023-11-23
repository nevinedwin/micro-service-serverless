import { DBClient } from "../utility/dataseClient";

export class DbOperation {

    constructor() { };

    async executeQuery(queryString: string, values: unknown[]) {

        const client = await DBClient();
        await client.connect();
        const result = await client.query(queryString, values);
        await client.end();

        return result;
    };
};