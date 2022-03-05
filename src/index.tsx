import {
  OptionsObject,
  VariantType,
  SnackbarKey,
  SnackbarProvider,
  SnackbarMessage,
  useSnackbar,
} from "notistack"
import { Box, IconButton, Collapse, Typography, Theme } from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
import { Close, Error, Warning, Info, CheckCircle } from "@mui/icons-material"
import React, { FC } from "react"

const useConfig = (variant: VariantType) => {
  const theme = useTheme<Theme>()

  switch (variant) {
    case "default":
      return {
        colors: {
          color: theme.palette.getContrastText(
            theme.palette.getContrastText(theme.palette.background.default)
          ),
          backgroundColor: theme.palette.getContrastText(
            theme.palette.background.default
          ),
        },
        Icon: () => null,
      }
    case "error":
      return {
        colors: {
          color: "error.contrastText",
          backgroundColor: "error.main",
        },
        Icon: Error,
      }
    case "info":
      return {
        colors: {
          color: "info.contrastText",
          backgroundColor: "info.main",
        },
        Icon: Info,
      }
    case "success":
      return {
        colors: {
          color: "success.contrastText",
          backgroundColor: "success.main",
        },
        Icon: CheckCircle,
      }
    case "warning":
      return {
        colors: {
          color: "warning.contrastText",
          backgroundColor: "warning.main",
        },
        Icon: Warning,
      }
  }
}

const useAlert = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // own variable for linting
  const useContent = (
    key: SnackbarKey,
    { message, variant }: { message: string; variant: VariantType }
  ) => {
    const { colors, Icon } = useConfig(variant)

    // todo: to config
    const p = 1

    return (
      // todo?: add "swipe to close" feature
      <Box
        sx={{
          ...colors,
          wordBreak: "break-word",
          display: "flex",
          alignItems: "center",
          p,
        }}
        key={key}
      >
        <Icon sx={{ mr: p }} />
        <Typography variant="body2" sx={{ mr: "auto" }}>
          {message}
        </Typography>
        <IconButton onClick={() => closeSnackbar(key)} color="inherit">
          <Close />
        </IconButton>
      </Box>
    )
  }

  return {
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => {
      return enqueueSnackbar(
        {
          message,
          variant: options?.variant || "default",
        },
        {
          content: useContent,
          ...options,
        }
      )
    },
    closeSnackbar,
  }
}

const useStyles = makeStyles({
  snackbarRoot: {
    left: "0 !important",
    bottom: "0 !important",
    "& > *": {
      width: "100vw !important",
      padding: "0 !important",
    },
    "& > div > *": {
      width: "100vw !important",
      padding: "0 !important",
    },
  },
})

const AlertProvider: FC = ({ children }) => {
  const { snackbarRoot } = useStyles()

  return (
    <SnackbarProvider
      TransitionComponent={Collapse}
      classes={{
        containerRoot: snackbarRoot,
      }}
      maxSnack={1}
    >
      {children}
    </SnackbarProvider>
  )
}

export { AlertProvider }
export default useAlert
