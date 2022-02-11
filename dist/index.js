"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertProvider = void 0;
var notistack_1 = require("notistack");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/styles");
var icons_material_1 = require("@mui/icons-material");
var useConfig = function (variant) {
    var theme = styles_1.useTheme();
    switch (variant) {
        case "default":
            return {
                colors: {
                    color: theme.palette.getContrastText(theme.palette.getContrastText(theme.palette.background.default)),
                    backgroundColor: theme.palette.getContrastText(theme.palette.background.default),
                },
                Icon: function () { return null; },
            };
        case "error":
            return {
                colors: {
                    color: "error.contrastText",
                    backgroundColor: "error.main",
                },
                Icon: icons_material_1.Error,
            };
        case "info":
            return {
                colors: {
                    color: "info.contrastText",
                    backgroundColor: "info.main",
                },
                Icon: icons_material_1.Info,
            };
        case "success":
            return {
                colors: {
                    color: "success.contrastText",
                    backgroundColor: "success.main",
                },
                Icon: icons_material_1.CheckCircle,
            };
        case "warning":
            return {
                colors: {
                    color: "warning.contrastText",
                    backgroundColor: "warning.main",
                },
                Icon: icons_material_1.Warning,
            };
    }
};
var useAlert = function () {
    var _a = notistack_1.useSnackbar(), enqueueSnackbar = _a.enqueueSnackbar, closeSnackbar = _a.closeSnackbar;
    // own variable for linting
    var useContent = function (key, _a) {
        var message = _a.message, variant = _a.variant;
        var _b = useConfig(variant), colors = _b.colors, Icon = _b.Icon;
        // todo: to config
        var p = 1;
        return (
        // todo?: add "swipe to close" feature
        React.createElement(material_1.Box, { sx: __assign(__assign({}, colors), { wordBreak: "break-word", display: "flex", alignItems: "center", p: p }), key: key },
            React.createElement(Icon, { sx: { mr: p } }),
            React.createElement(material_1.Typography, { variant: "body2", sx: { mr: "auto" } }, message),
            React.createElement(material_1.IconButton, { onClick: function () { return closeSnackbar(key); }, color: "inherit" },
                React.createElement(icons_material_1.Close, null))));
    };
    return {
        enqueueSnackbar: function (message, options) {
            return enqueueSnackbar({
                message: message,
                variant: (options === null || options === void 0 ? void 0 : options.variant) || "default",
            }, __assign({ content: useContent }, options));
        },
        closeSnackbar: closeSnackbar,
    };
};
var useStyles = styles_1.makeStyles({
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
});
var AlertProvider = function (_a) {
    var children = _a.children;
    var snackbarRoot = useStyles().snackbarRoot;
    return (React.createElement(notistack_1.SnackbarProvider, { TransitionComponent: material_1.Collapse, classes: {
            containerRoot: snackbarRoot,
        }, maxSnack: 1 }, children));
};
exports.AlertProvider = AlertProvider;
exports.default = useAlert;
