"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledNotification } from "./styles/notification-style";
import { setNotification } from "@/context/slice-notification";

export const Notification = () => {
	const { title, message, type, isOpen } = useSelector((state: Store) => state.notification);
	const dispatch = useDispatch();

	const closeNotification = () => {
		dispatch(
			setNotification({
				isOpen: false,
				title: "",
				message: "",
				type: "success",
			})
		);
	};

	if (!isOpen) return <></>;

	return (
		<StyledNotification type={type}>
			<button className="close" onClick={() => closeNotification()}>
				x
			</button>
			<h1 className="title">{title}</h1>
			<p className="message">{message}</p>
		</StyledNotification>
	);
};
