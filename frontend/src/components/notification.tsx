"use client";
import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledNotification } from "./style/styled-notification";
import { setNotification } from "@/context/notification-slice";

export const Notification = () => {
	const { isOpen, type, title, message } = useSelector((store: Store) => store.notification);
	const dispatch = useDispatch();

	const closeNotification = () => {
		dispatch(setNotification({ newState: { isOpen: false, type: "error", message: "", title: "" } }));
	};

	if (!isOpen) return null;

	return (
		<StyledNotification type={type} data-cy="notification">
			<button className="close" onClick={() => closeNotification()}>
				x
			</button>

			<h1 className="title">{title}</h1>
			<p className="text">{message}</p>
		</StyledNotification>
	);
};
