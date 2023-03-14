import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { InputCreateTag } from '../../interfaces/interfacesTags';

interface ResponseCreateTag {
	createTag: { message: string };
}

const CREATE_TAG = gql`
	mutation CreateTag($createTag: InputCreateTag!) {
		createTag(createTag: $createTag) {
			message
		}
	}
`;

export const requestCreateTag = async (url: string, createTag: InputCreateTag) => {
	const { data, errors } = await request<ResponseCreateTag>(url).mutate(CREATE_TAG).variables({ createTag });
	return { data: data?.createTag.message, error: errors?.[0].message };
};
