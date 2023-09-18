"use client";
import { Store } from "@/context/store";
import { useSelector } from "react-redux";

export const Notification = () => {
	const { isOpen, type, title, message } = useSelector((store: Store) => store.notification);

	if (!isOpen) return null;

	return (
		<div className={type}>
			<h1 className="title">{title}</h1>
			<p className="text">{message}</p>
		</div>
	);
};
