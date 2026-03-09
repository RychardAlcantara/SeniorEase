"use client"

import Navbar from "@/src/presentation/components/Navbar"
import TaskList from "@/src/presentation/components/TaskList"
import HistoryList from "@/src/presentation/components/HistoryList"
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton"

export default function Dashboard() {

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar/>

      <main className="max-w-6xl mx-auto p-8 grid grid-cols-3 gap-6">

        <div className="col-span-2">

          <h1 className="text-3xl font-bold text-gray-700 mb-6">
            Minhas Tarefas
          </h1>

          <TaskList/>

          <CreateTaskButton/>

        </div>

        <HistoryList/>

      </main>

    </div>

  )
}