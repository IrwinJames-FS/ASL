/*
In a production environment its a bad practice to pass ORM or Database errors directly to the client. These errors will be utilized to obfuscate the errors while providing information to the user
*/
class APIError extends Error {
	constructor(msg, status) {
		super(msg);
		this.status = status
	}
}

/**
 * Your typical 404 error
 */
class NotFoundError extends APIError {
	constructor(msg = "Not Found!"){
		super(msg, 404);
	}
}

/**
 * Generic 500 error
 */
class ServerError extends APIError {
	constructor(msg = "The server has encountered an error, please check back later") {
		super(msg, 500);
	}
}

/**
 * Validation Errors should allow for additional errors describing each error in the validation process
 */
class ValidationError extends APIError {
	constructor(msg = "The provided information does not match model", errors = []) {
		super(msg, 422);

		this.errors = [];
	}
}
module.exports = {
	NotFoundError,
	ServerError,
	ValidationError
}
