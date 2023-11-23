import { UserService } from '../service/userService';
import { errorResponse } from '../utility/response';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserRepository } from '../repository/userRepository';

const repository = new UserRepository();
const service = new UserService(repository);

export const signup = async (event: APIGatewayProxyEvent) => {

    return service.createUser(event);
};

export const login = async (event: APIGatewayProxyEvent) => {

    return service.userLogin(event);
};

export const verify = async (event: APIGatewayProxyEvent) => {

    const httpMethod = event.requestContext.httpMethod;

    switch (httpMethod) {
        case 'POST':
            return service.verifyUser(event);

        case 'GET':
            return service.getVerificationToken(event);

        default:
            return errorResponse(404, 'Requested method is not supported');
    };
};

export const profile = async (event: APIGatewayProxyEvent) => {

    const httpMethod = event.requestContext.httpMethod;

    switch (httpMethod) {
        case 'POST':
            return service.createProfile(event);

        case 'GET':
            return service.getProfile(event);

        case 'PUT':
            return service.editProfile(event);

        default:
            return errorResponse(404, 'Requested method is not supported');
    };
};

export const cart = async (event: APIGatewayProxyEvent) => {

    const httpMethod = event.requestContext.httpMethod;

    switch (httpMethod) {
        case 'POST':
            return service.createCart(event);

        case 'GET':
            return service.getCart(event);

        case 'PUT':
            return service.updateCart(event);

        default:
            return errorResponse(404, 'Requested method is not supported');
    };
};

export const payment = async (event: APIGatewayProxyEvent) => {

    const httpMethod = event.requestContext.httpMethod;

    switch (httpMethod) {
        case 'POST':
            return service.createPaymentMethod(event);

        case 'GET':
            return service.getPaymentMethod(event);

        case 'PUT':
            return service.updatePaymentMethod(event);

        default:
            return errorResponse(404, 'Requested method is not supported');
    };
};