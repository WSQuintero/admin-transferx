import React from "react"
import TableUsers from "./users/TableUsers"
import TableTransactions from "./transactions/TableTransactions"
import TableSarlaft from "./sarlaft/TableSarlaft"
import TableTickets from "./tickets/TableTickets"
import TableLogs from "./logs/TableLogs"
import TableBugs from "./bugs/TableBugs"
import "../styles/GeneralTable.css"

function GeneralTable({
  list,
  setList,
  sarlafts,
  setSarlafts,
  page,
  orders,
  thisUser,
  tickets,
  logs,
  bugs
}) {
  return (
    <>
      <TableUsers
        page={page}
        list={list}
        setList={setList}
        thisUser={thisUser}
      />
      <TableTransactions page={page} orders={orders} />
      <TableSarlaft sarlafts={sarlafts} setSarlafts={setSarlafts} page={page} />
      <TableTickets page={page} thisUser={thisUser} tickets={tickets} />
      <TableLogs page={page} logs={logs} />
      <TableBugs page={page} bugs={bugs} />
    </>
  )
}

export default GeneralTable
