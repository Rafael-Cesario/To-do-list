"use client";

import { IGetLists, RGetLists } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { useQuery } from "@apollo/client";
import { LoadingListsSkeleton } from "./loading-lists-skeleton";
import { StyledListContainer } from "./styles/styled-list-container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLists } from "../../context/list-slice";
import { Store } from "@/context/store";

interface Props {
	userID: string;
}

export const ListContainer = ({ userID }: Props) => {
	const { data, loading } = useQuery<RGetLists, IGetLists>(listQueries.GET_LISTS, { variables: { getListData: { userID } } });
	const { lists } = useSelector((state: Store) => state.list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data) dispatch(setLists({ lists: data.getLists }));
	}, [data]);

	if (loading) return <LoadingListsSkeleton />;

	return (
		<StyledListContainer>
			{lists.map((list) => (
				<div className="list" key={list.id}>
					<li>{list.name}</li>
					<span className="task-amount">{list.tasks?.length}</span>
				</div>
			))}

			{!lists.length && <span className="empty-lists">Suas listas aparecerão aqui</span>}
		</StyledListContainer>
	);
};
