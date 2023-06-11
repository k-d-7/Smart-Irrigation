import HttpException from "./HttpException";

class UserNotInProjectException extends HttpException {
    constructor() {
        super(404, "User not in project");
    }
}

export default UserNotInProjectException;