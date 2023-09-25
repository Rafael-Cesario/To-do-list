"use client";

import { IGetLists, RGetLists } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { useQuery } from "@apollo/client";
import { LoadingListsSkeleton } from "./loading-lists-skeleton";
import { StyledListContainer } from "./styles/styled-list-container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveList, setLists } from "../../context/list-slice";
import { Store } from "@/context/store";

interface Props {
	userID: string;
}

export const ListContainer = ({ userID }: Props) => {
	const { data, loading } = useQuery<RGetLists, IGetLists>(listQueries.GET_LISTS, { variables: { getListData: { userID } } });
	const { lists, filter } = useSelector((state: Store) => state.list);

	const dispatch = useDispatch();

	useEffect(() => {
		if (data) dispatch(setLists({ lists: data.getLists }));
	}, [data]);

	if (loading) return <LoadingListsSkeleton />;

	return (
		<StyledListContainer data-cy="list-container">
			{lists
				.filter((list) => list.name.match(new RegExp(filter, "i")))
				.map((list) => (
					<div onClick={() => dispatch(setActiveList({ newActive: list }))} className="list" key={list.id}>
						<li>{list.name}</li>
						<span className="task-amount">{list.tasks?.length}</span>
					</div>
				))}

			{!lists.length && <span className="empty-lists">Suas listas aparecerão aqui</span>}
		</StyledListContainer>
	);
};
