import React, { useContext, useEffect, useState } from "react"
import IncomingMessage from "./IncomingMessage"
import SendedMessage from "./SendedMessage"
import { IoSend } from "react-icons/io5"
import { MyContext } from "../context/context"

function Messages({ actualTicket, setActualTicket }) {
  const { $Tickets, token, user } = useContext(MyContext)
  const [newMessage, setNewMessage] = useState()

  const handleSendMessage = async (event) => {
    event.preventDefault()
    const message = { ticket: String(actualTicket.id), comment: newMessage }
    const { status, data } = await $Tickets.sendMessage(token, message)
    if (status) {
      setActualTicket((prev) => ({
        ...prev,
        responses: [
          ...actualTicket.responses,
          {
            id_user_who_responds: user.id,
            comment: newMessage,
            whoResponse: { firstname: user.firstname },
            createdAt: new Date()
          }
        ]
      }))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[500px] bg-transparent text-gray-800 p-10 border border-[#C3F53C]">
      <div className="flex flex-col flex-grow w-full  bg-transparent shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto overflow-x-hidden pr-10 ">
          {actualTicket?.responses?.map((response) =>
            Number(user?.id) === Number(response.id_user_who_responds) ? (
              <SendedMessage
                message={response.comment}
                name={response.whoResponse.firstname}
                created={response.createdAt}
                key={response.id}
              />
            ) : (
              <IncomingMessage
                message={response.comment}
                name={response.whoResponse.firstname}
                created={response.createdAt}
                key={response.id}
              />
            )
          )}
        </div>

        <div className="bg-[#C3F53C] p-4 flex justify-between items-center gap-5">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Escribe el nuevo mensaje"
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <IoSend
            size={35}
            color="black"
            className="cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default Messages
