export interface ITag {
	userID: string;
	tagID: string;
	name: string;
	color: string;
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
