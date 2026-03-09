"use client"

import TaskItem from "./TaskItem"

export default function TaskList() {

  const tasks = [
    "Digite a tarefa...",
    "Participar da aula online",
    "Enviar documento"
  ]

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Tomar medicamento
      </h2>

      {tasks.map((task, index) => (
        <TaskItem key={index} title={task}/>
      ))}

    </div>

  )
}