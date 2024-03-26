import axios from "axios"

export default class P2PService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL
    this.token = token
  }

  async getP2POrders(token) {
    try {
      const response = await axios.get(`${this.API_URL}/userP2P`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async approveP2P(token, formData) {
    try {
      const response = await axios.post(
        `${this.API_URL}/userP2P/approve-user-p2p`,
        formData,
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

  async rejectP2P(token, reject) {
    try {
      const response = await axios.post(
        `${this.API_URL}/userP2P/reject-user-p2p`,
        { ...reject },
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
