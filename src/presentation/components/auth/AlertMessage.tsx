interface AlertMessageProps {
  type: "error" | "success"
  message: string
}

export function AlertMessage({ type, message }: AlertMessageProps) {
  const styles = {
    error: "bg-red-50 border border-red-300 text-red-700",
    success: "bg-green-50 border border-green-300 text-green-700",
  }

  return (
    <div className={`rounded-lg px-4 py-3 text-sm mb-5 ${styles[type]}`}>
      {message}
    </div>
  )
}
