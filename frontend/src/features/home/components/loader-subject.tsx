"use client";
import { Store } from "@/context/store";
import { client } from "@/services/client";
import { errorsMap } from "@/services/errors-map";
import { IGetSubjects, RGetSubjects } from "@/services/interfaces/subjects";
import { subjectQueries } from "@/services/queries/subjects";
import { showError } from "@/utils/show-error";
import { useDispatch, useSelector } from "react-redux";

export const LoaderSubject = () => {
	const { active } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	const getSubjects = async (listID: string) => {
		try {
			const { data } = await client.query<RGetSubjects, IGetSubjects>({
				query: subjectQueries.GET_SUBJECTS,
				variables: { listID: listID },
			});

			console.log({ data });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error.message);
			showError(error, dispatch, errorsMap.subject);
		}
	};

	getSubjects(active.listID);

	return null;
};
