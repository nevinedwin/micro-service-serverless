
const formatResponse = (statusCode: number, message: string, data: unknown) => {

	return {
		statusCode,
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		body: JSON.stringify({
			message,
			...(data && { data })
		})
	};

};


export const successResponse = (data: object) => {

	return formatResponse(200, "success", data);
};


export const errorResponse = (code: number = 1000, error: unknown) => {

	if (Array.isArray(error)) {

		const errorObject = error[0].constraints;
		const errorMessage = errorObject[Object.keys(errorObject)[0]] || "Error Occured";

		return formatResponse(code, errorMessage, errorMessage);

	};

	return formatResponse(code, `${error}`, error);
};