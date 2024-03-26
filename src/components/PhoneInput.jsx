import React, { useState } from "react"
import Flags from "react-flags-select"

const COUNTRIES = [
  // Latinoamérica
  { code: "AR", name: "Argentina", phoneCode: "+54" },
  { code: "BO", name: "Bolivia", phoneCode: "+591" },
  { code: "BR", name: "Brasil", phoneCode: "+55" },
  { code: "CL", name: "Chile", phoneCode: "+56" },
  { code: "CO", name: "Colombia", phoneCode: "+57" },
  { code: "CR", name: "Costa Rica", phoneCode: "+506" },
  { code: "CU", name: "Cuba", phoneCode: "+53" },
  { code: "EC", name: "Ecuador", phoneCode: "+593" },
  { code: "SV", name: "El Salvador", phoneCode: "+503" },
  { code: "GT", name: "Guatemala", phoneCode: "+502" },
  { code: "HT", name: "Haití", phoneCode: "+509" },
  { code: "HN", name: "Honduras", phoneCode: "+504" },
  { code: "JM", name: "Jamaica", phoneCode: "+1876" },
  { code: "MX", name: "México", phoneCode: "+52" },
  { code: "NI", name: "Nicaragua", phoneCode: "+505" },
  { code: "PA", name: "Panamá", phoneCode: "+507" },
  { code: "PY", name: "Paraguay", phoneCode: "+595" },
  { code: "PE", name: "Perú", phoneCode: "+51" },
  { code: "DO", name: "República Dominicana", phoneCode: "+1809" },
  { code: "SR", name: "Suriname", phoneCode: "+597" },
  { code: "TT", name: "Trinidad y Tobago", phoneCode: "+1868" },
  { code: "UY", name: "Uruguay", phoneCode: "+598" },
  { code: "VE", name: "Venezuela", phoneCode: "+58" },

  // Europa
  { code: "AL", name: "Albania", phoneCode: "+355" },
  { code: "DE", name: "Alemania", phoneCode: "+49" },
  { code: "AD", name: "Andorra", phoneCode: "+376" },
  { code: "AT", name: "Austria", phoneCode: "+43" },
  { code: "AZ", name: "Azerbaiyán", phoneCode: "+994" },
  { code: "BY", name: "Bielorrusia", phoneCode: "+375" },
  { code: "BE", name: "Bélgica", phoneCode: "+32" },
  { code: "BA", name: "Bosnia y Herzegovina", phoneCode: "+387" },
  { code: "BG", name: "Bulgaria", phoneCode: "+359" },
  { code: "CY", name: "Chipre", phoneCode: "+357" },
  { code: "VA", name: "Ciudad del Vaticano", phoneCode: "+39" },
  { code: "HR", name: "Croacia", phoneCode: "+385" },
  { code: "DK", name: "Dinamarca", phoneCode: "+45" },
  { code: "SK", name: "Eslovaquia", phoneCode: "+421" },
  { code: "SI", name: "Eslovenia", phoneCode: "+386" },
  { code: "ES", name: "España", phoneCode: "+34" },
  { code: "EE", name: "Estonia", phoneCode: "+372" },
  { code: "FI", name: "Finlandia", phoneCode: "+358" },
  { code: "FR", name: "Francia", phoneCode: "+33" },
  { code: "GE", name: "Georgia", phoneCode: "+995" },
  { code: "GR", name: "Grecia", phoneCode: "+30" }
]
const PhoneInput = () => {
  const [selectedCountry, setSelectedCountry] = useState("CO")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleCountryChange = (code) => {
    setSelectedCountry(code)
  }

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  return (
    <div className="flex flex-col gap-4">
      <label for="country" className="text-sm font-medium">
        País
      </label>
      <Flags
        selected={selectedCountry}
        onSelect={handleCountryChange}
        className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        options={COUNTRIES} // Replace with your list of countries (ISO codes)
        searchable={true} // Optional: enable search functionality
      />

      <label for="phone" className="text-sm font-medium">
        Teléfono
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={`${
          COUNTRIES.find((c) => c.code === selectedCountry).phoneCode
        }${phoneNumber}`}
        onChange={handlePhoneChange}
        className="bg-white border border-gray-300 rounded-lg text-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  )
}

export default PhoneInput
