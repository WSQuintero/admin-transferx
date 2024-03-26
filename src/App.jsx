import React, { useContext, useEffect } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

import "./css/style.css"
import Users from "./pages/Users"
import Transactions from "./pages/Transactions"
import Tickets from "./pages/Tickets"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { MyContext } from "./context/context"
import NormalUser from "./pages/NormalUser"
import Sarlaft from "./pages/Sarlaft"
import Logs from "./pages/Logs"
import Bugs from "./pages/Bugs"

function App() {
  const { token } = useContext(MyContext)

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/users"
        element={token ? <Users /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/transactions"
        element={token ? <Transactions /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/tickets"
        element={token ? <Tickets /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/normal-user"
        element={token ? <NormalUser /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/sarlaft"
        element={token ? <Sarlaft /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/logs"
        element={token ? <Logs /> : <Navigate to="/login" replace />}
      />
      <Route
        exact
        path="/bugs"
        element={token ? <Bugs /> : <Navigate to="/login" replace />}
      />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
