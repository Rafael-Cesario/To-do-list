"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { setSubjects } from "../../context/subject-slice";
import { IGetSubjects, RGetSubjects } from "@/services/interfaces/subjects";
import { subjectQueries } from "@/services/queries/subjects";
import { client } from "@/services/client";

export const LoaderSubject = () => {
	const { active } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	const loadSubjects = async () => {
		const { data } = await client.query<RGetSubjects, IGetSubjects>({ query: subjectQueries.GET_SUBJECTS, variables: { listID: active.listID }, fetchPolicy: "no-cache" });
		const subjects = data.getSubjects;
		dispatch(setSubjects({ subjects }));
	};

	loadSubjects();

	return null;
};
