import { StyledMain } from "./styles/styled-main";
import { TaskContainer } from "./components/main/task-container";

export const Main = () => {
	return (
		<StyledMain>
			<TaskContainer />
			{/* <TaskDetails /> */}
		</StyledMain>
	);
};
