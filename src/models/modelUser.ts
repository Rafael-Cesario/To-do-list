import { prop, index, getModelForClass } from '@typegoose/typegoose';

@index({ email: 1 }, { unique: true })
class User {
	@prop({ type: String, required: [true, 'Name is required'], maxlength: 20 })
	public name!: string;

	@prop({ type: String, required: [true, 'Email is required'], lowercase: true })
	public email!: string;

	@prop({ type: String, required: [true, 'Password is required'] })
	public password!: string;
}

export const ModelUser = getModelForClass(User);
