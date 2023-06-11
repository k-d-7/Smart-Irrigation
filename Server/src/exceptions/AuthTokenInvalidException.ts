import HttpException from "./HttpException"

class AuthTokenInvalidException extends HttpException {
  constructor() {
    super(401, 'Wrong Authentication token is not valid');
  }
}

export default AuthTokenInvalidException