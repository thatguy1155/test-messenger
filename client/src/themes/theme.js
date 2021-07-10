import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  spacing: [1,2,3,4,5,6,7,8,9,10,11],
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});
