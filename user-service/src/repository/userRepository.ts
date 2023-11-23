import { UserModel } from "../models/userModel";
import { IUserRepository } from "../interfaces/userInterface";
import { DBClient } from "../utility/dataseClient";
import { DbOperation } from "./dbOperations";

export class UserRepository extends DbOperation implements IUserRepository {

    constructor() {
        super();
    };


    async createAccount({ email, password, userType, phone, salt }: UserModel) {

        const queryString = "INSERT INTO users(phone, email, password, salt, user_type) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [phone, email, password, salt, userType];
        const result = await super.executeQuery(queryString, values);

        if (result.rowCount > 0) {

            return result.rows[0] as UserModel;
        };
    };


    async findAccount(email: string): Promise<UserModel> {

        const queryString = "SELECT user_id, email, password, phone, salt, verification_code, expiry FROM  users WHERE email = $1 ";
        const values = [email];
        const result = await super.executeQuery(queryString, values);

        if (result.rowCount < 0) {

            throw new Error("User does not exists with provided email id!");
        };

        return result.rows[0] as UserModel;
    };

    async updateVerificationCode(userId: string, code: number, expiry: Date) {

        const queryString = "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 RETURNING *";
        const values = [code, expiry, userId];
        const result = await super.executeQuery(queryString, values);

        if (result.rowCount < 0) {

            throw new Error("User does not exists with provided email id!");
        };

        return result.rows[0] as UserModel;
    };
};