"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false)

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      {/* Logo */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-bold text-blue-700 italic">
          SeniorEase
        </h1>

        <p className="text-gray-600 text-lg mt-2">
          Plataforma acessível para você
        </p>

      </div>

      {/* Card Login */}

      <div className="bg-white w-[420px] p-10 rounded-xl shadow-md">

        <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">
          Login
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Plataforma acessível para você
        </p>

        {/* Email */}

        <div className="mb-5">

          <label className="block text-gray-600 text-lg mb-2">
            E-mail
          </label>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-3
            text-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

        </div>

        {/* Senha */}

        <div className="mb-6">

          <label className="block text-gray-600 text-lg mb-2">
            Senha
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-3
              text-lg
              pr-10
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={22}/> : <Eye size={22}/>}
            </button>

          </div>

        </div>

        {/* Botão */}

        <button
          className="
          w-full
          py-3
          text-xl
          font-semibold
          text-white
          rounded-lg
          bg-gradient-to-r
          from-blue-600
          to-blue-800
          hover:opacity-90
          transition
          "
        >
          ENTRAR
        </button>

        {/* Links */}

        <div className="text-center mt-6 space-y-3">

          <p className="text-blue-600 hover:underline cursor-pointer">
            Esqueceu sua senha?
          </p>

          <p className="text-blue-600 hover:underline cursor-pointer">
            Criar Conta
          </p>

        </div>

      </div>

    </div>
  )
}