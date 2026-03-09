"use client"

export default function HistoryList() {

  const history = [
    "Participar da reunião — concluído hoje",
    "Enviar documento — concluído ontem",
    "Tomar medicamento — concluído 10/05"
  ]

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Histórico de Tarefas
      </h2>

      <div className="space-y-4">

        {history.map((item, index) => (

          <div key={index} className="flex items-start gap-2">

            <span className="text-green-500">✔</span>

            <p className="text-gray-600">
              {item}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}