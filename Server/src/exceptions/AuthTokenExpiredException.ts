import HttpException from "./HttpException";

class AuthTokenExpiredException extends HttpException {
    constructor() {
        super(401, "Authentication token has expired");
    }
}

export default AuthTokenExpiredException;