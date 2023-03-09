import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { InputCreateList, InputDeleteList, InputRenameList } from '../../interfaces/interfacesLists';

interface ResponseCreateList {
	createList: { message: string };
}

interface ResponseReadLists {
	readLists: { lists: string[] };
}

interface ResponseRenameList {
	renameList: { message: string };
}

interface ResponseDeleteList {
	deleteList: { message: string };
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

export const requestReadLists = async (url: string, email: string) => {
	const { data, errors } = await request<ResponseReadLists>(url).query(READ_LISTS).variables({ email });
	return { data, errors };
};

export const requestRenameList = async (url: string, variables: InputRenameList) => {
	const { data, errors } = await request<ResponseRenameList>(url)
		.mutate(RENAME_LIST)
		.variables({ renameList: variables });

	return { data, errors };
};
export const requestDeleteList = async (url: string, variables: InputDeleteList) => {
	const { data, errors } = await request<ResponseDeleteList>(url)
		.mutate(DELETE_LIST)
		.variables({ deleteList: variables });

	return { data, errors };
};
