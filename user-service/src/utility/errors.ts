import { ValidationError, validate } from "class-validator";

export const appValidationError = async (input: any): Promise<ValidationError[] | false> => {

    const error = await validate(input, { ValidationError: { taget: true } });

    if (error.length) return error;

    return false;
};