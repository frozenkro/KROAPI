import { Request, Response, NextFunction } from 'express';
import { ILogRequest, LogRequest } from '../models/LogRequest';
import mongoose, { Schema, Model } from 'mongoose';

function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start: number = Date.now();

    console.log('defining responseInterceptor')
    // Define a response interceptor to log the response data
    const responseInterceptor = {
      get: async function(target: any, property: any, receiver: any) {
        console.log('called the get');
        if (property === 'send') {
          return function(data: any) {
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

            console.log('help');
            const logRequest = new LogRequest(logRequestData);
            logRequest.save();

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
