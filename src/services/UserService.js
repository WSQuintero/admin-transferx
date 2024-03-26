import axios from "axios"

export default class UserService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL
    this.token = token
  }

  async getUsers(token) {
    try {
      const response = await axios.get(`${this.API_URL}/users`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async changeStatus(token, email) {
    try {
      const response = await axios.put(
        `${this.API_URL}/users/change-status`,
        { email: email },
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
  async changeStatusSarlaft(token, statusSarlaft) {
    try {
      const response = await axios.put(
        `${this.API_URL}/users/linking`,
        { ...statusSarlaft },
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

  async changeRole(token, newRole) {
    try {
      const response = await axios.put(
        `${this.API_URL}/users/change-role`,
        { ...newRole },
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
  async changeInformationBank(token, informationBank) {
    try {
      const response = await axios.put(
        `${this.API_URL}/users/change-bank`,
        { ...informationBank },
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
  async changeRate(token, newRate) {
    try {
      const response = await axios.put(
        `${this.API_URL}/users/change-rate`,
        { ...newRate },
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
  async getSarlaftsPending(token) {
    try {
      const response = await axios.get(
        `${this.API_URL}/users/link`,

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
  async updateWallet(token, wallet) {
    try {
      const response = await axios.put(
        `${this.API_URL}/users/change-wallet-address`,
        { ...wallet },
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
