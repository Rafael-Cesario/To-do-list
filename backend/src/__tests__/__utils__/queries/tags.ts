import gql from "graphql-tag";

class TagQueries {
	CREATE_TAG = gql`
		mutation CreateTag($input: ICreateTag!) {
			createTag(input: $input) {
				userID
				tagID
				name
				color
			}
		}
	`;

	GET_TAG = gql`
		query GetTags($userID: String!) {
			getTags(userID: $userID) {
				userID
				tagID
				name
				color
			}
		}
	`;

	UPDATE_TAG = gql`
		mutation UpdateTag($input: IUpdateTag!) {
			updateTag(input: $input) {
				userID
				tagID
				name
				color
			}
		}
	`;

	DELETE_TAG = gql`
		mutation DeleteTag($tagID: String!) {
			deleteTag(tagID: $tagID)
		}
	`;
}

export const tagQueries = new TagQueries();