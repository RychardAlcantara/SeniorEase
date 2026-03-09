"use client"

interface Props {
  title: string
}

export default function TaskItem({ title }: Props) {

  return (

    <div className="flex items-center justify-between border-b py-3">

      <div className="flex items-center gap-3">

        <span className="text-yellow-500">✔</span>

        <p className="text-lg text-gray-700">
          {title}
        </p>

      </div>

      <div className="flex gap-2">

        <button className="border px-3 py-1 rounded text-sm">
          Concluir
        </button>

        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
          Editar
        </button>

      </div>

    </div>

  )
}