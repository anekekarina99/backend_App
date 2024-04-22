import { Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppResponse {
  static ok(res: Response, values: any, message: string = ""): Response {
    return res.status(HttpStatus.OK).json({
      values,
      message
    });
  }

  static badRequest(res: Response, values: any, message: string = ""): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      values,
      message
    });
  }
}
