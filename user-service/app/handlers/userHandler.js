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
exports.payment = exports.cart = exports.profile = exports.verify = exports.login = exports.signup = void 0;
const userService_1 = require("../service/userService");
const userRepository_1 = require("../repository/userRepository");
const repository = new userRepository_1.UserRepository();
const service = new userService_1.UserService(repository);
const signup = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return service.createUser(event);
});
exports.signup = signup;
const login = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return service.userLogin(event);
});
exports.login = login;
const verify = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return service.verifyUser(event);
});
exports.verify = verify;
const profile = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received event:', event);
    // const httpMethod = event.requestContext.httpMethod;
    // switch (httpMethod) {
    //     case 'POST':
    //         return service.createProfile(event);
    //     case 'GET':
    //         return service.getProfile(event);
    //     case 'PUT':
    //         return service.editProfile(event);
    //     default:
    //         return errorResponse(404, 'Requested method is not supported');
    // };
});
exports.profile = profile;
const cart = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received event:', event);
    // const httpMethod = event.requestContext.httpMethod;
    // switch (httpMethod) {
    //     case 'POST':
    //         return service.createCart(event);
    //     case 'GET':
    //         return service.getCart(event);
    //     case 'PUT':
    //         return service.updateCart(event);
    //     default:
    //         return errorResponse(404, 'Requested method is not supported');
    // };
});
exports.cart = cart;
const payment = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received event:', event);
    // const httpMethod = event.requestContext.httpMethod;
    // switch (httpMethod) {
    //     case 'POST':
    //         return service.createPaymentMethod(event);
    //     case 'GET':
    //         return service.getPaymentMethod(event);
    //     case 'PUT':
    //         return service.updatePaymentMethod(event);
    //     default:
    //         return errorResponse(404, 'Requested method is not supported');
    // };
});
exports.payment = payment;
//# sourceMappingURL=userHandler.js.map