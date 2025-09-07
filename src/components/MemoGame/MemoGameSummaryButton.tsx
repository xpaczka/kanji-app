type MemoGameSummaryButton = {
  onClick: () => void
  label: string
}

export default function MemoGameSummaryButton({
  onClick,
  label
}: MemoGameSummaryButton) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-md border-2 border-gray-200 px-4 py-2 font-medium transition duration-150 ease-in-out hover:border-orange-400 hover:bg-orange-400 hover:text-white"
    >
      {label}
    </button>
  )
}
