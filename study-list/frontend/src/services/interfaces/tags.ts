export interface ITag {
	userID: string;
	tagID: string;
	name: string;
	color: string;
}

export interface IGetTags {
	userID: string;
}

export interface RGetTags {
	getTags: ITag[];
}

export interface ICreateTag {
	input: {
		userID: string;
		name: string;
		color: string;
	};
}

export interface IUpdateTag {
	input: {
		tagID: string;
		name: string;
		color: string;
	};
}

export interface IDeleteTag {
	tagID: string;
}
