import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class GqlHttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException /*, host: ArgumentsHost*/) {
    // const gqlHost = GqlArgumentsHost.create(host);
    const response = exception.getResponse();

    return {
      message: response['message'] || 'An error occurred',
      statusCode: exception.getStatus(),
    };
  }
}
