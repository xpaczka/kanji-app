import Auth from "#/components/auth/Auth"

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex items-center gap-8 sm:items-start">
        <Auth />
      </main>
    </div>
  )
}
