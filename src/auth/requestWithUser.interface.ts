
import { Request } from "express";
import { UserDocument } from "src/user/schemas/user.schema";

export default interface RequestWithUser extends Request {
    user: UserDocument
}