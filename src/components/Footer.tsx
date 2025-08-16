export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="h-[2px] w-full bg-gray-200" />
      <div className="flex w-full justify-between py-8">
        <p className="font-bold">KANJI APP</p>
        <p className="text-sm font-medium text-gray-400">
          Copyright @ Coding Kanji {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
