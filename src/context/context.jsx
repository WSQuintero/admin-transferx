import { createContext, useEffect, useMemo, useState } from "react"
import AuthService from "../services/AuthService"
import UserService from "../services/UserService"
import P2PService from "../services/P2PService"
import TicketService from "../services/TicketService"
import LogsService from "../services/LogsService"

const MyContext = createContext()

function ContextProvider({ children }) {
  const [cellphone, setCellphone] = useState()
  const $Auth = useMemo(() => new AuthService(), [])
  const $User = useMemo(() => new UserService(), [])
  const $Orders = useMemo(() => new P2PService(), [])
  const $Tickets = useMemo(() => new TicketService(), [])
  const $Logs = useMemo(() => new LogsService(), [])
  const [actualTicket, setActualTicket] = useState()
  const [IsRejectTransaction, setIsRejectTransaction] = useState()
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage?.getItem("session"))?.token || undefined
  })
  const [actualUser, setActualUser] = useState(null)
  const [changeTicket, setChangeTicket] = useState()
  const [actualDataUser, setActualDataUser] = useState(
    (actualUser && {
      role: actualUser?.role,
      rate: actualUser?.rate,
      status: actualUser?.status,
      sarlaft: actualUser?.sarlaft_validated,
      address_wallet_transfer_in: actualUser?.address_wallet_transfer_in
    }) ||
      null
  )

  useEffect(() => {
    const storedToken = JSON.parse(localStorage?.getItem("session"))?.token
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const [user, setUser] =
    useState(
      () => JSON.parse(localStorage?.getItem("session"))?.user || null
    ) || undefined
  return (
    <MyContext.Provider
      value={{
        setCellphone,
        cellphone,
        $Auth,
        setToken,
        token,
        user,
        setUser,
        $User,
        $Orders,
        $Tickets,
        actualDataUser,
        setActualDataUser,
        actualUser,
        setActualUser,
        changeTicket,
        setChangeTicket,
        actualTicket,
        setActualTicket,
        IsRejectTransaction,
        setIsRejectTransaction,
        $Logs
      }}>
      {children}
    </MyContext.Provider>
  )
}

export { ContextProvider, MyContext }
