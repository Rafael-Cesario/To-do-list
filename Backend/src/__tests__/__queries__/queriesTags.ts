import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { InputCreateTag, InputUpdateTag } from '../../interfaces/interfacesTags';

interface ResponseCreateTag {
	createTag: { message: string };
}

interface ResponseUpdateTag {
	updateTag: { message: string };
}

const CREATE_TAG = gql`
	mutation CreateTag($createTag: InputCreateTag!) {
		createTag(createTag: $createTag) {
			message
		}
	}
`;

const UPDATE_TAG = gql`
	mutation UpdateTag($updateTag: InputUpdateTag!) {
		updateTag(updateTag: $updateTag) {
			message
		}
	}
`;

export const requestCreateTag = async (url: string, createTag: InputCreateTag) => {
	const { data, errors } = await request<ResponseCreateTag>(url).mutate(CREATE_TAG).variables({ createTag });
	return { data: data?.createTag.message, error: errors?.[0].message };
};

export const requestUpdateTag = async (url: string, updateTag: InputUpdateTag) => {
	const { data, errors } = await request<ResponseUpdateTag>(url).mutate(UPDATE_TAG).variables({ updateTag });
	return { data: data?.updateTag.message, error: errors?.[0].message };
};
