import { createTheme } from "@mui/material";

const primaryColorScheme = {
    main: "#1976d2",
    dark: "#1565c0",
    light: "#42a5f5",
    contrastText: "#fff"
};

export const muiDarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: primaryColorScheme
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryColorScheme.main,
                    color: primaryColorScheme.contrastText
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryColorScheme.main,
                    color: primaryColorScheme.contrastText
                }
            }
        },
    },
});

export const muiLightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: primaryColorScheme
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryColorScheme.main,
                    color: primaryColorScheme.contrastText
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryColorScheme.main,
                    color: primaryColorScheme.contrastText
                }
            }
        },
    },
});