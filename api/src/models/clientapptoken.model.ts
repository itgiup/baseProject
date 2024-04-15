import { Schema, Document, model, Model } from "mongoose";

interface IClientAppToken {
  name?: string,
  url?: string,
  token?: string,
  timeout?: number,
  timeout2?: number,
  skipOTP?: boolean,
  logMessage?: string,
  createdAt?: Date,
  updatedAt?: Date,
}
interface IClientAppTokenDocument extends Document, IClientAppToken {

}
interface IClientAppTokenModel extends Model<IClientAppTokenDocument> {

}
const schema = new Schema<IClientAppToken>({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  timeout: {
    type: Number,
  },
  timeout2: {
    type: Number,
  },
  skipOTP: {
    type: Boolean,
  },
  logMessage: {
    type: String,
    default: 'logMessage...',
  }
}, {
  timestamps: true,
  strict: false,
});

const ClientAppToken = model<IClientAppToken, IClientAppTokenModel>("ClientAppToken", schema);
export {
  ClientAppToken,
  IClientAppTokenDocument,
  IClientAppTokenModel,
  IClientAppToken
}
export default ClientAppToken;