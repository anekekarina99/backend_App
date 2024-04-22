import { HttpException, HttpStatus } from "@nestjs/common";
export class UnauthorizedException extends HttpException {
    constructor(message: string = "Unauthorized!") {
        super({ values: "", message: message }, HttpStatus.UNAUTHORIZED);
    }
}