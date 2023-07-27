import { setNotification } from "@/context/slice-notification";
import { errorsMap } from "@/services/errors-map";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const showError = (e: any, dispatch: Dispatch<AnyAction>) => {
	const [errorCode] = e.message.split(": ");
	const error = errorsMap.user[errorCode as keyof typeof errorsMap.user] ?? "Um erro inesperado ocorreu. Por favor tente recarregar a página";
	dispatch(setNotification({ isOpen: true, type: "error", title: "Ops, algo deu errado", message: error }));
};
