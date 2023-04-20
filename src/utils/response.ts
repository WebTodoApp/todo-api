import { FastifyReply } from "fastify"


/**
 * @param {String} message - The message
 * @param {JSON} body - The Json (optional)
 * @returns {JSON}
 */
const responseOK = (message: string, body: object = null)=> {
  if (body) {
    return {
      success: true,
      message: message,
      body: body
    };
  } else {
    return {
      success: true,
      message: message,
    };
  }
}

/**
   * @param {String} error - The error message
   * @param {JSON} body - The Json (optional)
   * @returns {JSON}
   */
const responseERROR = (error: string, body: object = null) => {
  if(body) {
    return {
      success: false,
      error: error,
      body: body
    };
  } else {
    return {
      success: false,
      error: error
    };
  }
  
}

// Errors
const returnType = Object.freeze({
  INVALID_FIELDS: "Invalid field(s)",
  SERVER: Object.freeze({
    MISSING_TOKEN: "Token is missing in the request header"
  }),
  GROUP: Object.freeze({
    CREATED: "Group created successfully",
    UPDATED: "Group updated succesfully",
    DELETED: "Group removed succesfully",
    FOUND: "Group found",
    NOT_FOUND: "Group not found",
    UNABLE_TO_VERIFY: "Unable to verify group",
    EXIST: "Group already exist",
    NOEXIST: "Group not exist",
    CANT_CREATE: "Cannot create group",
    CANT_DELETE: "Cannot delete group",
    CANT_UPDATE: "Cannot update group",
  }),
  TODO: Object.freeze({
    CREATED: "Todo created successfully",
    UPDATED: "Todo updated succesfully",
    DELETED: "Todo removed succesfully",
    FOUND: "Todo found",
    NOT_FOUND: "Todo not found",
    UNABLE_TO_VERIFY: "Unable to verify todo",
    EXIST: "Todo already exist",
    NOEXIST: "Todo not exist",
    CANT_CREATE: "Cannot create todo",
    CANT_DELETE: "Cannot delete todo",
    CANT_UPDATE: "Cannot update todo",
  }),
  USER: Object.freeze({
    SUCCESS_LOGIN: "Successfully login",
    SUCCESS_SIGNUP: "Successfully registered",
    FOUND: "User found",
    NOT_FOUND: "User not found",
    UNABLE_TO_VERIFY: "Unable to verify user",
    UNABLE_TO_VERIFY_EMAIL: "unable to verify user email",
    EXIST: "User already exist",
    NOEXIST: "User not exist in DB",
    CANT_CREATE: "Cannot create user",
    CANT_DELETE: "Cannot delete user",
    CANT_UPDATE: "Cannot update user",
    WRONG_USERNAME: "Wrong username (must be length 3 - 17)",
    WRONG_EMAIL: "Email is not valid",
    WRONG_PASSWORD: "Password invalid (must lenght 4 - 30 and include 1 number at least)",
    DIFFERENT_PASSWORD: "Passwords must match",
    INVALID_PASSWORD: "Invalid password",
    CANT_UPDATE_PASSWORD: "Cannot update user passsword",
    EMAIL_NOEXIST: "User email not exist in DB",
    EMAIL_EXIST: "User email already exist",
    CANT_ADD_PASSWORD_REQUEST: "Cannot add user reset password request",
    CANT_SEND_PASSWORD_REQUEST: "Cannot send reset password email",
    CANT_RESET_PASSWORD: "Cannot reset user password"
  }),
  HTTP_STATUS: Object.freeze({
    200: {
      statusCode: 200,
      message: "Success",
    },
    201: {
      statusCode: 201,
      message: "Success"
    },
    204: {
      statusCode: 204,
      message: "No content",
    },
    400: {
      statusCode: 400,
      message: "Bad request",
    },
    401: {
      statusCode: 401,
      message: "Unauthorized",
    },
    403: {
      statusCode: 403,
      message: "Forbidden access",
    },
    404: {
      statusCode: 404,
      message: 'Not found',
    },
    409: {
      statusCode: 409,
      message: 'Conflict server',
    },
    500: {
      statusCode: 500,
      message: "Server error",
    },
  }),
})


const handleResponseError = (res: FastifyReply, err: any, code: number) => {  
  return res.code(returnType.HTTP_STATUS[code].statusCode).send(responseERROR(err ? err : returnType.HTTP_STATUS[code].message));
};

export default {
  responseOK,
  responseERROR,
  returnType,
  handleResponseError
};





