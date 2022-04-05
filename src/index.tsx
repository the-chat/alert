import { SnackbarProvider, ProviderContext } from "notistack"
import { makeStyles } from "@mui/styles"
import genContext, { ProviderWrapperProps } from "@the-chat/gen-context"
import { PropsWithChildren } from "react"
import NotificiactionInterface from "./NotificiactionInterface"
import { Collapse } from "@mui/material"
import useCustomSnackbar from "./useCustomSnackbar"

const useStyles = makeStyles({
  containerRoot: {
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

type RealProviderWrapperProps = PropsWithChildren<
  Pick<ProviderWrapperProps<ProviderContext | undefined>, "RealProvider">
>

const RealProviderWrapper = ({
  children,
  RealProvider,
}: RealProviderWrapperProps) => (
  <RealProvider value={useCustomSnackbar()}>{children}</RealProvider>
)

const [useAlert, AlertProvider] = genContext<ProviderContext>(
  ({ RealProvider, children }) => {
    const classes = useStyles()

    return (
      <SnackbarProvider
        TransitionComponent={Collapse}
        content={NotificiactionInterface}
        classes={classes}
        maxSnack={1}
      >
        <RealProviderWrapper RealProvider={RealProvider}>
          {children}
        </RealProviderWrapper>
      </SnackbarProvider>
    )
  }
)

export { AlertProvider }
export default useAlert

// todo?: comments that describes how code works
