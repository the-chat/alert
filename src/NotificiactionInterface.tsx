import { Box, IconButton, Typography } from "@mui/material"
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack"
import useConfig from "./useConfig"

type UseContentOptions = { message: SnackbarMessage } & Pick<
  OptionsObject,
  "variant"
>

const NotificiactionInterface = (
  key: SnackbarKey,
  { message, variant = "default" }: UseContentOptions
) => {
  const { closeSnackbar } = useSnackbar()
  const { color, backgroundColor, Icon } = useConfig(variant)

  // todo: to config
  const p = 1

  return (
    // todo?: add "swipe to close" feature
    <Box
      sx={{
        color,
        backgroundColor,
        wordBreak: "break-word",
        display: "flex",
        alignItems: "center",
        p,
      }}
      key={key}
    >
      {Icon && <Icon sx={{ mr: p }} />}
      <Typography variant="body2" sx={{ mr: "auto" }}>
        {message}
      </Typography>
      <IconButton onClick={() => closeSnackbar(key)} color="inherit">
        <Close />
      </IconButton>
    </Box>
  )
}

export default NotificiactionInterface
