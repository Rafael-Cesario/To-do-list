import { prop, getModelForClass, PropType } from '@typegoose/typegoose';

class Todo {
	@prop({ type: String })
	public email!: string;

	@prop({ type: String })
	public listName!: string;

	@prop({ type: String })
	public id!: string;

	@prop({ type: String })
	public task!: string;

	@prop({ type: String })
	public state!: string;

	@prop({ type: String }, PropType.ARRAY)
	public tags!: string[];
}

export const ModelTodo = getModelForClass(Todo);
