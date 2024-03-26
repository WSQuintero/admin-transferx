import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import ThemeProvider from "./utils/ThemeContext"
import App from "./App"
import { ContextProvider } from "./context/context"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </ContextProvider>
  </React.StrictMode>
)
