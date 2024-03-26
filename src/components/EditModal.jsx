import React, { useContext, useEffect, useState } from "react"
import EditModalUser from "./users/EditModalUser"
import EditModalTransactions from "./transactions/EditModalTransactions"
import EditModalTickets from "./tickets/EditModalTickets"

function EditModal({
  openModal,
  setOpenModal,
  setList,
  list,
  page,
  actualOrder,
  actualTicket,
  thisUser,
  setActualTicket
}) {
  return (
    <>
      <EditModalUser
        openModal={openModal}
        setOpenModal={setOpenModal}
        setList={setList}
        list={list}
        page={page}
        thisUser={thisUser}
      />
      <EditModalTransactions
        openModal={openModal}
        setOpenModal={setOpenModal}
        page={page}
        actualOrder={actualOrder}
      />
      <EditModalTickets
        openModal={openModal}
        setOpenModal={setOpenModal}
        page={page}
        actualTicket={actualTicket}
        setActualTicket={setActualTicket}
      />
    </>
  )
}

export default EditModal
