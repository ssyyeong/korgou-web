import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import AppRoutes from "./routes/routes";
import "./App.css"; // CSS 추가
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3966AE",
    },
    secondary: {
      main: "#282930",
    },
    grey: {
      200: "#61636C",
    },
    info: {
      main: "#B1B2B6",
    },
  },
});

const App = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <div className="container">
            <AppRoutes />
          </div>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
