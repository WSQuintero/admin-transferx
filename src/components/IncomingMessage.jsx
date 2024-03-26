import { formatDate } from "../utils/Utils"

function IncomingMessage({ message, name, created }) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="flex-shrink-0 h-10 w-10 rounded-full text-white">
        {name}:
      </div>
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">{message} </p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {formatDate(created)}
        </span>
      </div>
    </div>
  )
}

export default IncomingMessage
