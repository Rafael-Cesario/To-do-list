import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { InputCreateList } from '../../interfaces/interfacesLists';

interface ResponseCreateList {
	createList: { message: string };
}

const CREATE_LIST = gql`
	mutation CreateList($createList: InputCreateList!) {
		createList(createList: $createList) {
			message
		}
	}
`;
const READ_LISTS = gql`
	query ReadLists($email: String!) {
		readLists(email: $email) {
			lists
		}
	}
`;
const RENAME_LIST = gql`
	mutation RenameList($renameList: InputRenameList!) {
		renameList(renameList: $renameList) {
			message
		}
	}
`;
const DELETE_LIST = gql`
	mutation DeleteList($deleteList: InputDeleteList!) {
		deleteList(deleteList: $deleteList) {
			message
		}
	}
`;

export const requestCreateList = async (url: string, variables: InputCreateList) => {
	const { data, errors } = await request<ResponseCreateList>(url)
		.mutate(CREATE_LIST)
		.variables({ createList: variables });
	return { data, errors };
};

export const readLists = () => {
	return;
};
export const renameList = () => {
	return;
};
export const deleteList = () => {
	return;
};
