import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';

const APP_SECRET = "out_app_secret"


export const getSalt = async () => {

    return await bcrypt.genSalt();
};


export const getHashedPassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);
};


export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return (await getHashedPassword(enteredPassword, salt)) == savedPassword;
};


export const getToken = ({ email, userType, userId, phone, password, salt }: UserModel) => {

    return jwt.sign(
        { email, phone, userId, userType },
        APP_SECRET,
        { expiresIn: "30d" }
    );
};


export const verifyToken = (token: string): UserModel | false => {
    try {

        if (token !== "") {

            const payload = jwt.verify(token.split(" ")[1], APP_SECRET)
            return payload as UserModel;
        };

        return false;

    } catch (error) {

        console.log(error);
        return false;
    };
};