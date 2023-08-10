"use client";
import { Store } from "@/context/store";
import { client } from "@/services/client";
import { IGetSubjects, RGetSubjects } from "@/services/interfaces/subjects";
import { subjectQueries } from "@/services/queries/subjects";
import { useDispatch, useSelector } from "react-redux";
import { setSubjects } from "../../context/subject-slice";

export const LoaderSubject = () => {
	const { active } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	const getSubjects = async (listID: string) => {
		const { data } = await client.query<RGetSubjects, IGetSubjects>({ query: subjectQueries.GET_SUBJECTS, variables: { listID: listID }, fetchPolicy: "no-cache" });
		dispatch(setSubjects({ subjects: data.getSubjects }));
	};

	getSubjects(active.listID);

	return null;
};
