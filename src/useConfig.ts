import {
  Error,
  Warning,
  Info,
  CheckCircle,
  SvgIconComponent,
} from "@mui/icons-material"
import { Theme } from "@mui/material"
import { useTheme } from "@mui/styles"
import { VariantType } from "notistack"

const useDefaultConfig = () => {
  const { getContrastText, background } = useTheme<Theme>().palette

  return {
    color: getContrastText(getContrastText(background.default)),
    backgroundColor: getContrastText(background.default),
  }
}

const errorConfig = {
  color: "error.contrastText",
  backgroundColor: "error.main",
  Icon: Error,
}

const infoConfig = {
  color: "info.contrastText",
  backgroundColor: "info.main",
  Icon: Info,
}

const successConfig = {
  color: "success.contrastText",
  backgroundColor: "success.main",
  Icon: CheckCircle,
}

const warningConfig = {
  color: "warning.contrastText",
  backgroundColor: "warning.main",
  Icon: Warning,
}

type Config = {
  color: string
  backgroundColor: string
  Icon?: SvgIconComponent
}

const useConfig = (variant: VariantType): Config => {
  switch (variant) {
    case "default":
      return useDefaultConfig()
    case "error":
      return errorConfig
    case "info":
      return infoConfig
    case "success":
      return successConfig
    case "warning":
      return warningConfig
  }
}

export default useConfig
