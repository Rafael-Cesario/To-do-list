import { setNotification } from "@/context/slice-notification";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const showError = (completeError: any, dispatch: Dispatch<AnyAction>, errorsMap: { [key: string]: string }) => {
	const [errorCode] = completeError.message.split(": ");
	const error = errorsMap[errorCode] ?? "Um erro inesperado ocorreu. Por favor tente recarregar a página";
	dispatch(setNotification({ isOpen: true, type: "error", title: "Ops, algo deu errado", message: error }));
};
