import React, { useContext, useEffect, useState } from "react"
import { MyContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import PopUp from "../components/PopUp"

function SignUp() {
  const { cellphone, setCellphone, $Auth } = useContext(MyContext)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const closePopUp = () => {
    setMessage("")
    setError(false)
    setSuccess(false)
  }
  const validation = (data) => {
    if (
      data.firstname === "" ||
      data.lastname === "" ||
      data.email === "" ||
      data.cellphone === "" ||
      data.password === ""
    ) {
      setError(true)
      setMessage("Todos los campos deben estar llenos.")
      return false
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

    if (!passwordPattern.test(data.password)) {
      setError(true)
      setMessage(
        "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número, un carácter especial y tener una longitud mínima de 8 caracteres."
      )
      return false
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(data.email)) {
      setError(true)
      setMessage(
        "Por favor, introduce una dirección de correo electrónico válida."
      )
      return false
    }
    return true
  }

  const handleRegister = (event) => {
    event.preventDefault()
    setError(false)
    setMessage(false)
    setSuccess(false)

    const name = event.target.elements.name.value // Cambiado a "firstname"
    const lastName = event.target.elements.lastname.value
    const email = event.target.elements.email.value
    const tel = event.target.elements.tel.value // Cambiado a "tel"
    const password = event.target.elements.password.value

    // No se entiende lo que intentas hacer con setCellphone, parece un error

    const dataForm = {
      firstname: name || "",
      lastname: lastName || "",
      email: email || "",
      cellphone: tel || "",
      password: password || "",
      referal_code_parent: ""
    }

    const validate = validation(dataForm)

    if (!validate) {
      return
    }

    setSuccess(true)
    setMessage("Registro exitoso")
    setTimeout(() => {
      navigate("/login")
    }, 1000)

    // const { status, data } = $Auth.SignUp({ dataForm })

    // if (status) {
    //   setSuccess(true)
    //   setMessage("Registro exitoso")
    //   setTimeout(() => {
    //     navigate("/otp-verification")
    //   }, 1000)
    // } else {
    //   setError(true)
    //   setMessage("Hubo un error en el registro, intenta nuevamente")
    // }
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
    <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-black h-[100vh] overflow-hidden">
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 overflow-hidden flex justify-center items-center">
        <img
          src="../images/Polygon 2.png"
          alt="shadow"
          className="absolute top-0 left-0 z-0"
        />
        <img
          alt=""
          src="../images/completesize.png"
          className=" inset-0 h-full w-full object-contain max-w-[400px]"
        />
      </div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 h-full border border-[#C3F53C] z-50">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-white">
            ¡Regístrate!
          </h1>

          <p className="mt-4 text-gray-400">
            Por favor bríndanos los siguientes datos
          </p>
        </div>

        <form
          action="#"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 z-50"
          onSubmit={handleRegister}>
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm "
                placeholder="Nombres"
                name="name"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm "
                placeholder="Apellidos"
                name="lastname"
              />
            </div>
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
                type="tel"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                placeholder="Teléfono"
                name="tel"
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
              Registrar
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

export default SignUp
