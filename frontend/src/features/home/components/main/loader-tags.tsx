"use client";
import { client } from "@/services/client";
import { cookies } from "@/services/cookies";
import { IUserCookies } from "@/services/interfaces/cookies";
import { IGetTags, RGetTags } from "@/services/interfaces/tags";
import { tagsQueries } from "@/services/queries/tags";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTags } from "../../context/tag-slice";

export const LoaderTags = () => {
	const dispatch = useDispatch();

	const getTags = async () => {
		const { userID }: IUserCookies = await cookies.get("user");
		const { data } = await client.query<RGetTags, IGetTags>({ query: tagsQueries.GET_TAG, variables: { userID } });
		dispatch(setTags({ userID, newTags: data.getTags }));
	};

	useEffect(() => {
		getTags();
	}, []);

	return null;
};
