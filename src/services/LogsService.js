import axios from "axios"

export default class LogsService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL
    this.token = token
  }

  async getBugsByUser(token, userId) {
    try {
      const response = await axios.get(`${this.API_URL}/bug`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async getAllLogs(token) {
    try {
      const response = await axios.get(`${this.API_URL}/audit`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
}
