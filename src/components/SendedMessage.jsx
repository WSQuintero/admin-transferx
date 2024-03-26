import React from "react"
import { formatDate } from "../utils/Utils"

function SendedMessage({ message, name, created }) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-[#C3F53C] text-black p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {formatDate(created)}
        </span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full text-[#C3F53C]">
        :{name}
      </div>
    </div>
  )
}

export default SendedMessage
