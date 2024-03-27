import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PopUp from "../components/PopUp"
import { MyContext } from "../context/context"

function Login() {
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const { $Auth, setToken, setUser } = useContext(MyContext)

  const navigate = useNavigate()
  const validateErrorMessage = (errorMessage) => {
    switch (errorMessage) {
      case "Valida primero tu correo electrónico y número de teléfono":
        setMessage(
          "Por favor, valida tu correo electrónico y teléfono antes de iniciar sesión."
        )
        break
      case "incorrect password":
        setMessage(
          "Contraseña incorrecta. Por favor, verifica tu contraseña e intenta nuevamente."
        )
        break
      case "user does not exist":
        setMessage(
          "El usuario no existe. Por favor, verifica tus credenciales o regístrate si eres nuevo."
        )
        break
      default:
        console.error("Error en el inicio de sesión:", errorMessage)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    closePopUp()

    const email = event.target.elements.email.value.trim()
    const password = event.target.elements.password.value

    if (!email || !password) {
      setError(true)
      setMessage("Please enter your email and password.")
      return
    }

    try {
      const { status, data } = await $Auth.signIn({ email, password })

      if (status) {
        setToken(data.data.token)

        localStorage.setItem("session", JSON.stringify(data.data))
        if (data.data.user.role === 0) {
          navigate("/normal-user")
        }
        navigate("/")
        setUser(data.data.user)
      } else {
        setError(true)
        validateErrorMessage(data)
        console.error("Login failed:", data)
      }
    } catch (error) {
      setError(true)
      setMessage("An error occurred. Please try again later.")
      console.error("Login error:", error)
    }
  }

  const closePopUp = () => {
    setMessage("")
    setError(false)
    setSuccess(false)
  }
  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        setError(false)
        setSuccess(false)
      }, 10000)
    }
  }, [error, success])
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-black h-[100vh] overflow-hidden justify-center items-center">
      <img
        src="../images/Polygon 2.png ../"
        alt="shadow"
        className="absolute top-0 left-0 z-0"
      />
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 h-full border border-[#C3F53C] z-50 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-lg text-center">
          <img
            src="../images/completesize.png"
            alt="logo"
            className="o object-contain "
          />
          <h1 className="text-2xl font-bold sm:text-3xl text-white">
            ¡Bienvenido de vuelta!
          </h1>

          <p className="mt-4 text-gray-400">Por favor ingresa tus datos </p>
        </div>

        <form
          action="#"
          onSubmit={handleLogin}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 z-50 w-full">
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                placeholder="Email"
                name="email"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                placeholder="password"
                name="password"
              />
            </div>
          </div>
          <div className="w-full flex justify-center it">
            <button className="w-[150px] p-1 bg-[#C3F53C] text-[#10231D] rounded-xl text-sm font-bold cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </div>
      <img
        src="../images/Polygon 3.png"
        alt="shadow"
        className="absolute bottom-0 right-0 z-0"
      />
      {success ||
        (error && (
          <PopUp
            message={message}
            error={error}
            success={success}
            closePopUp={closePopUp}
          />
        ))}
    </section>
  )
}

export default Login
