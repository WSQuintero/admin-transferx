import axios from "axios"

export default class TicketService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL
    this.token = token
  }

  async getTickets(token) {
    try {
      const response = await axios.get(`${this.API_URL}/tickets`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async closeTicket(token, body) {
    try {
      const response = await axios.put(
        `${this.API_URL}/tickets/change-status`,
        body,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async sendMessage(token, message) {
    try {
      const response = await axios.post(
        `${this.API_URL}/tickets/response`,
        message,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
}
