"use client"

import { Home, ListTodo, Settings, User } from "lucide-react"

export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow">

      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        <h1 className="text-2xl font-bold italic">
          SeniorEase
        </h1>

        <nav className="flex gap-8 text-lg items-center">

          <button className="flex items-center gap-2 hover:opacity-80">
            <Home size={20}/>
            Início
          </button>

          <button className="flex items-center gap-2 hover:opacity-80">
            <ListTodo size={20}/>
            Tarefas
          </button>

          <button className="flex items-center gap-2 hover:opacity-80">
            <Settings size={20}/>
            Configurações
          </button>

          <button className="flex items-center gap-2 hover:opacity-80">
            <User size={20}/>
            Meu Perfil
          </button>

        </nav>

        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
          Precisa de ajuda?
        </button>

      </div>

    </header>
  )
}