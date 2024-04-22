import { BaseTransformer } from "transformer.base"


export class UserTransformer extends BaseTransformer {
    password: string
    static singleTransform(element) {
        return {
            id: element.id,
            email: element.email,
            createdAt: element.createdAt,
            password : element.password
        }
    }
}