import axios from "axios"

export default class AuthService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL
    this.token = token
  }

  async signUp({ ...body }) {
    try {
      const response = await axios.post(`${this.API_URL}/users/signup`, body)

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }

  async signIn({ email, password }) {
    try {
      const response = await axios.post(`${this.API_URL}/users/signin`, {
        email,
        password
      })

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response.data.message }
    }
  }

  async confirmCellphone({ cellphone, code }) {
    try {
      const response = await axios.post(
        `${this.API_URL}/users/validate-cellphone`,
        {
          cellphone,
          code
        }
      )

      return { status: true, data: response.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }

  async resendConfirmationCode({ cellphone }, token) {
    try {
      const response = await axios.post(
        `${this.API_URL}/users/resend-otp-cod`,
        {
          cellphone: cellphone
        },
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
