import { prop, getModelForClass, PropType } from '@typegoose/typegoose';

class Todo {
	@prop({ type: String, required: true })
	public email!: string;

	@prop({ type: String, required: true })
	public listName!: string;

	@prop({ type: String, required: true })
	public id!: string;

	@prop({ type: String, required: true })
	public task!: string;

	@prop({ type: String, required: true })
	public status!: string;

	@prop({ type: String, required: true, lowercase: true }, PropType.ARRAY)
	public tags!: string[];

	@prop({ type: String })
	public notes!: string;
}

export const ModelTodo = getModelForClass(Todo);
