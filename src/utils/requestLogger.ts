import { Request, Response, NextFunction } from 'express';
import { ILogRequest, LogRequest } from '../models/LogRequest';
import mongoose, { Schema, Model } from 'mongoose';

function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start: number = Date.now();

    // Define a response interceptor to log the response data
    const responseInterceptor = {
      get: function(target: any, property: any, receiver: any) {
        if (property === 'send') {
          return async function(data: any) {
            const duration: number = Date.now() - start;

            const logRequestData: ILogRequest = {
                timeStamp: new Date().toString(),
                method: req.method,
                path: req.path,
                params: req.params.toString(),
                body: req.body.toString(),
                dev: process.env.ENV === 'DEV',
                res: data,
                statusCode: res.statusCode,
                duration
            };

            const logRequest = new LogRequest(logRequestData);
            await logRequest.save();

            target.send(data);
          }
        }
        return Reflect.get(target, property, receiver);
      }
    };
  
    // Override the response object with the interceptor
    res = new Proxy(res, responseInterceptor);

    next();
}

export default requestLogger;
