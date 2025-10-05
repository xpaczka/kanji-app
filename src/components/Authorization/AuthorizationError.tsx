type AuthorizationErrorProps = {
  error: string | null
}

export default function AuthorizationError({ error }: AuthorizationErrorProps) {
  if (!error) return null

  return (
    <div className="w-full rounded-md bg-red-500 p-2 px-4 text-center">
      <p className="font-medium text-white">{error}</p>
    </div>
  )
}
