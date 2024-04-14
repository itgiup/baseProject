import { Schema, Document, model, Model } from "mongoose";

interface IExtension {
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
interface IExtensionDocument extends Document, IExtension {

}
interface IExtensionModel extends Model<IExtensionDocument> {

}
const schema = new Schema<IExtension>({
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

const ClientAppToken = model<IExtension, IExtensionModel>("ClientAppToken", schema);
export {
  ClientAppToken,
  IExtensionDocument,
  IExtensionModel,
  IExtension
}
export default ClientAppToken;