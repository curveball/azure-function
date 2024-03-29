import { Application, Context, MemoryRequest, MemoryResponse, Response } from '@curveball/kernel';
import * as qs from 'querystring';
import { AzureFunction, Context as AzureContext, HttpRequest as AzureRequest } from '@azure/functions';
import { AzureResponse } from './types';

export default function azureHandler(app: Application): AzureFunction {

  const httpTrigger: AzureFunction = async (azrContext: AzureContext, request: AzureRequest): Promise<void> => {

    const context = new Context(
      azureRequestToCurveball(app.origin, request),
      new MemoryResponse(app.origin),
    );

    await app.handle(context);

    azrContext.res = curveballResponseToAzure(context.response);

  };

  return httpTrigger;

}

function azureRequestToCurveball(origin: string, request: AzureRequest): MemoryRequest<any> {

  if (request.method === null) {
    throw new Error('Azure method can not be null');
  }

  return new MemoryRequest(
    origin,
    request.method,
    request.url + '?' + qs.stringify(request.query),
    request.headers,
    request.rawBody
  );

}

function curveballResponseToAzure(cbResponse: Response<any>): AzureResponse {

  let isRaw = false;
  const body = cbResponse.body;

  if (body instanceof Buffer) {
    isRaw = true;
  }

  return {
    status: cbResponse.status,
    headers: cbResponse.headers.getAll(),
    isRaw,
    body,
  };

}
