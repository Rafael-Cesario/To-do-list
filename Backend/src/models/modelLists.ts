import { prop, index, getModelForClass } from '@typegoose/typegoose';

@index({ listName: 1 }, { unique: true })
class List {
	@prop({ type: String, required: [true, 'Email is required'], lowercase: true })
	public email!: string;

	@prop({ type: String, required: [true, 'ListName is required'], lowercase: true })
	public listName!: string;
}

export const ModelList = getModelForClass(List);
