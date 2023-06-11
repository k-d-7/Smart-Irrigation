import HttpException from './HttpException';

class PhoneAlreadyExistsException extends HttpException {
  constructor(phone: string) {
    super(400, `User with phone ${phone} already exists`);
  }
}

export default PhoneAlreadyExistsException;