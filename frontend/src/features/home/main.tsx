import { StyledMain } from "./styles/styled-main";
import { TaskContainer } from "./components/main/task-container";
import { TaskDetails } from "./components/main/task-details";

export const Main = () => {
	return (
		<StyledMain>
			<TaskContainer />
			<TaskDetails />
		</StyledMain>
	);
};
