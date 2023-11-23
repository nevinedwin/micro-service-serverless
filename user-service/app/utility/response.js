"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const formatResponse = (statusCode, message, data) => {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(Object.assign({ message }, (data && { data })))
    };
};
const successResponse = (data) => {
    return formatResponse(200, "success", data);
};
exports.successResponse = successResponse;
const errorResponse = (code = 1000, error) => {
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints;
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || "Error Occured";
        return formatResponse(code, errorMessage, errorMessage);
    }
    ;
    return formatResponse(code, `${error}`, error);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map