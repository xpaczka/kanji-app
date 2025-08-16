import Image from "next/image"

export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="h-[2px] w-full bg-gray-200" />
      <div className="flex w-full flex-col items-center justify-between gap-3 py-6 md:flex-row lg:py-8">
        <Image src="/logo.svg" alt="Logo" width={120} height={25} />
        <p className="text-sm font-medium text-gray-400">
          Copyright @ Coding Kanji {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
