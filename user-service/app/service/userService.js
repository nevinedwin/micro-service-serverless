"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const response_1 = require("../utility/response");
const class_transformer_1 = require("class-transformer");
const signupInput_1 = require("../models/dto/signupInput");
const errors_1 = require("../utility/errors");
const password_1 = require("../utility/password");
const loginInput_1 = require("../models/dto/loginInput");
class UserService {
    constructor(respository) {
        this.repository = respository;
    }
    ;
    // User Creation, Validation & Login
    createUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(event);
                const input = (0, class_transformer_1.plainToClass)(signupInput_1.SignupInput, JSON.parse(event.body));
                const validateInputError = yield (0, errors_1.appValidationError)(input);
                if (validateInputError)
                    return (0, response_1.errorResponse)(404, validateInputError);
                const salt = yield (0, password_1.getSalt)();
                const hashedPassword = yield (0, password_1.getHashedPassword)(input.password, salt);
                const data = yield this.repository.createAccount({
                    email: input.email,
                    password: hashedPassword,
                    salt,
                    phone: input.phone,
                    userType: "BUYER"
                });
                return (0, response_1.successResponse)(data);
            }
            catch (error) {
                console.log(error);
                return (0, response_1.errorResponse)(500, error);
            }
            ;
        });
    }
    ;
    userLogin(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = (0, class_transformer_1.plainToClass)(loginInput_1.LoginInput, JSON.parse(event.body));
                const validateInputError = yield (0, errors_1.appValidationError)(input);
                if (validateInputError)
                    return (0, response_1.errorResponse)(404, validateInputError);
                const data = yield this.repository.findAccount(input.email);
                const verified = yield (0, password_1.validatePassword)(input.password, data.password, data.salt);
                if (!verified)
                    throw new Error("password does not match");
                const token = (0, password_1.getToken)(data);
                return (0, response_1.successResponse)([token]);
            }
            catch (error) {
                console.log(error);
                return (0, response_1.errorResponse)(500, error);
            }
            ;
        });
    }
    ;
    verifyUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from verify user" });
        });
    }
    ;
    // User Profile
    createProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from create profile" });
        });
    }
    ;
    editProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from edit profile" });
        });
    }
    ;
    getProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from get profile" });
        });
    }
    ;
    // Cart Section
    createCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from create cart" });
        });
    }
    ;
    updateCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from update cart" });
        });
    }
    ;
    getCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from get cart" });
        });
    }
    ;
    // Payment Section
    createPaymentMethod(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from create payment method" });
        });
    }
    ;
    updatePaymentMethod(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from update payment method" });
        });
    }
    ;
    getPaymentMethod(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "response from get payment method" });
        });
    }
    ;
}
exports.UserService = UserService;
;
//# sourceMappingURL=userService.js.map