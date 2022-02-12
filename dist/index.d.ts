import { OptionsObject, SnackbarKey } from "notistack";
import { FC } from "react";
declare const useAlert: () => {
    enqueueSnackbar: (message: string, options?: OptionsObject | undefined) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey | undefined) => void;
};
declare const AlertProvider: FC;
export { AlertProvider };
export default useAlert;
