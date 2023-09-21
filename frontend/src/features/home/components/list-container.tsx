"use client";

import { IGetLists, RGetLists } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { useQuery } from "@apollo/client";

interface Props {
	userID: string;
}

export const ListContainer = ({ userID }: Props) => {
	const { data, loading } = useQuery<RGetLists, IGetLists>(listQueries.GET_LISTS, { variables: { getListData: { userID } } });

	// todo > List skeleton loading component
	if (loading) return <p>Loading...</p>;

	return (
		<ul className="list-container">
			{data?.lists?.map((list) => (
				<div className="list" key={list.id}>
					<li>{list.name}</li>
					<span className="task-amount">{list.tasks?.length}</span>
				</div>
			))}

			{!data?.lists && <span className="empty-lists">Suas listas aparecerão aqui</span>}
		</ul>
	);
};
