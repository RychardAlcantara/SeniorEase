import { ReactNode } from "react"

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-blue-700 italic">
          SeniorEase
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Plataforma acessível para você
        </p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-[420px] p-10 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-gray-500 mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>

    </div>
  )
}
