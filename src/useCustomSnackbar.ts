import { ProviderContext, useSnackbar } from "notistack"

const useCustomSnackbar = (): ProviderContext => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return {
    enqueueSnackbar: (message, options) =>
      enqueueSnackbar(
        {
          message,
          variant: options?.variant || "default",
        },
        options
      ),
    closeSnackbar,
  }
}

export default useCustomSnackbar
