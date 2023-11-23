import { errorResponse, successResponse } from '../utility/response';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IUserRepository, IUserService } from '../interfaces/userInterface';
import { plainToClass } from 'class-transformer';
import { SignupInput } from '../models/dto/signupInput';
import { appValidationError } from '../utility/errors';
import { getHashedPassword, getSalt, getToken, validatePassword, verifyToken } from '../utility/password';
import { LoginInput } from '../models/dto/loginInput';
import { generateAccessCode, sendVerificationCode } from '../utility/notification';
import { VerificationInput } from '../models/dto/updateInput';

export class UserService implements IUserService {

    repository: IUserRepository;

    constructor(respository: IUserRepository) {

        this.repository = respository;
    };

    // User Creation, Validation & Login
    async createUser(event: APIGatewayProxyEvent) {

        try {

            console.log(event);
            const input = plainToClass(SignupInput, JSON.parse(event.body));
            const validateInputError = await appValidationError(input);

            if (validateInputError) return errorResponse(404, validateInputError);

            const salt = await getSalt();
            const hashedPassword = await getHashedPassword(input.password, salt);
            const data = await this.repository.createAccount({
                email: input.email,
                password: hashedPassword,
                salt,
                phone: input.phone,
                userType: "BUYER"
            });

            return successResponse(data);
        } catch (error) {

            console.log(error);
            return errorResponse(500, error);
        };
    };

    async userLogin(event: APIGatewayProxyEvent) {

        try {

            const input = plainToClass(LoginInput, JSON.parse(event.body));
            const validateInputError = await appValidationError(input);

            if (validateInputError) return errorResponse(404, validateInputError);

            const data = await this.repository.findAccount(input.email);
            const verified = await validatePassword(input.password, data.password, data.salt);

            if (!verified) throw new Error("password does not match");

            const token = getToken(data);

            return successResponse([token]);
        } catch (error) {

            console.log(error);
            return errorResponse(500, error);
        };
    };


    async getVerificationToken(event: APIGatewayProxyEvent) {

        try {

            const token = JSON.parse(event.headers.authorization);
            const payload = verifyToken(token);

            if (!payload) return errorResponse(403, "UnAuthorized to perform this operation!");

            const { code, expiry } = generateAccessCode();
            await this.repository.updateVerificationCode(payload.user_id, code, expiry);
            const response = await sendVerificationCode(code, payload.phone);

            return successResponse({ message: "verification code sent to your regestered mobile number" });
        } catch (error) {

            return errorResponse(500, error);
        };
    };

    async verifyUser(event: APIGatewayProxyEvent) {

        const token = JSON.parse(event.headers.authorization);
        const payload = verifyToken(token);

        if (!payload) return errorResponse(403, "UnAuthorized to perform this operation!");

        const input = plainToClass(VerificationInput, JSON.parse(event.body));
        const validateInputError = await appValidationError(input);

        const { verification_code, expiry } = await this.repository.findAccount(payload.email);

        return successResponse({ message: "response from verify user" });
    };


    // User Profile
    async createProfile(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from create profile" })
    };

    async editProfile(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from edit profile" })
    };

    async getProfile(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from get profile" })
    };

    // Cart Section
    async createCart(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from create cart" })
    };

    async updateCart(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from update cart" })
    };

    async getCart(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from get cart" })
    };

    // Payment Section
    async createPaymentMethod(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from create payment method" })
    };

    async updatePaymentMethod(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from update payment method" })
    };

    async getPaymentMethod(event: APIGatewayProxyEvent) {

        return successResponse({ message: "response from get payment method" })
    };
};