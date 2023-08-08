import gql from "graphql-tag";

class SubjectQueries {
	CREATE_SUBJECT = gql`
		mutation CreateSubject($input: ICreateSubject!) {
			createSubject(input: $input) {
				amount
				date
				listID
				name
				notes
				subjectID
				tags
			}
		}
	`;

	GET_SUBJECTS = gql`
		query GetSubjects($listID: String!) {
			getSubjects(listID: $listID) {
				amount
				date
				listID
				name
				notes
				subjectID
				tags
			}
		}
	`;
}

export const subjectQueries = new SubjectQueries();
