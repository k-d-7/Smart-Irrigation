import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {
    constructor() {
        super(404, "Post not found");
    }
}

export default PostNotFoundException;