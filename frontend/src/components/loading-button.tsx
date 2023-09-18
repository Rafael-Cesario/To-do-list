import { StyledLoadingButton } from "./style/styled-loading-button";

export const LoadingButton = ({ className }: { className: string }) => {
	return (
		<StyledLoadingButton className={className}>
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</StyledLoadingButton>
	);
};
