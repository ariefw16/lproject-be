import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Define the type for the exception response
    type ExceptionResponseType = { message: string | string[] } | string;

    const exceptionResponse =
      exception instanceof HttpException
        ? (exception.getResponse() as ExceptionResponseType) // Ensure the type matches
        : 'Internal server error';

    // Extract the message safely
    const formattedMessage =
      typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? exceptionResponse.message
        : exceptionResponse;

    // Return the response in the desired format
    response.status(status).json({
      success: false,
      status,
      message: formattedMessage,
      data: null,
    });
  }
}
