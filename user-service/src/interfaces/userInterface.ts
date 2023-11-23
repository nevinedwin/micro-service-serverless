import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserModel } from '../models/userModel';

export interface IUserService {

    createUser(event: APIGatewayProxyEvent): Promise<any>;
    userLogin(event: APIGatewayProxyEvent): Promise<any>;
    verifyUser(event: APIGatewayProxyEvent): Promise<any>;
    createProfile(event: APIGatewayProxyEvent): Promise<any>;
    editProfile(event: APIGatewayProxyEvent): Promise<any>;
    getProfile(event: APIGatewayProxyEvent): Promise<any>;
    createCart(event: APIGatewayProxyEvent): Promise<any>;
    updateCart(event: APIGatewayProxyEvent): Promise<any>;
    getCart(event: APIGatewayProxyEvent): Promise<any>;
    createPaymentMethod(event: APIGatewayProxyEvent): Promise<any>;
    updatePaymentMethod(event: APIGatewayProxyEvent): Promise<any>;
    getPaymentMethod(event: APIGatewayProxyEvent): Promise<any>;
};

export interface IUserRepository {

    createAccount(event: UserModel): Promise<any>;
    findAccount(email: string): Promise<any>;
    updateVerificationCode(userId: string, code: number, expiry: Date): Promise<any>;
};