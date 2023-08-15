import { StyledFeedback } from "./style/feedback-style";

type Feedback = { type: "error" | "success"; message: string };

interface Props {
	feedback: Feedback;
	setFeedback: (newState: Feedback) => void;
}

export const Feedback = ({ feedback, setFeedback }: Props) => {
	return (
		<StyledFeedback type={feedback.type} role="feedback">
			<p className="text">{feedback.message}</p>

			<button onClick={() => setFeedback({ type: "error", message: "" })} className="close">
				x
			</button>
		</StyledFeedback>
	);
};
