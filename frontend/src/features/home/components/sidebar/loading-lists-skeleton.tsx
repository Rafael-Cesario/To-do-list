import { StyledLoadingLists } from "./styles/styled-loading-lists";

export const LoadingListsSkeleton = () => {
	return (
		<StyledLoadingLists className="list-container">
			<li className="list" />
			<li className="list" />
			<li className="list" />
		</StyledLoadingLists>
	);
};
