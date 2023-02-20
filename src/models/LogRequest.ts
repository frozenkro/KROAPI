import mongoose, { Schema, Model } from 'mongoose';

interface ILogRequest {
    timeStamp: string,
    method: string,
    path: string,
    params?: string,
    body?: string,
    dev: boolean,
    res: string,
    statusCode: number,
    duration: number
}

const LogRequestSchema = new Schema({
    timeStamp: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    params: { type: String },
    body: { type: String },
    dev: { type: Boolean },
    res: { type: String },
    statusCode: { type: Number },
    duration: { type: Number }
})
const LogRequest: Model<ILogRequest> = mongoose.model<ILogRequest>('LogRequest', LogRequestSchema);
export {ILogRequest, LogRequest};