import { Schema, Document, model, Model } from "mongoose";

export enum State {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

interface ITodo {
  content: string,
  state?: State,
  createdAt: Date,
  updatedAt: Date
}
interface ITodoDocument extends Document, ITodo {

}
interface ITodoModel extends Model<ITodoDocument> {

}

const schema = new Schema<ITodo>({
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: State,
    default: State.PENDING,
  },
}, {
  timestamps: true,
  strict: false,
});

const Todo = model<ITodo, ITodoModel>("Todo", schema);

export {
  Todo,
  ITodoDocument as ITodoDocument,
  ITodoModel as ITodoModel,
  ITodo as ITodo
}
export default Todo;