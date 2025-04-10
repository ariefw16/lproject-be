import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();

    let formattedErrors = {};

    // Ensure exceptionResponse is an object and has a "message" array
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse &&
      Array.isArray(exceptionResponse.message)
    ) {
      formattedErrors = this.formatValidationErrors(exceptionResponse.message);
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      status: HttpStatus.BAD_REQUEST,
      message: formattedErrors,
      data: null,
    });
  }

  private formatValidationErrors(errors: ValidationError[]) {
    const formattedErrors = {};
    errors.forEach((error) => {
      if (error.constraints) {
        formattedErrors[error.property] = Object.values(error.constraints);
      }
    });
    return formattedErrors;
  }
}
