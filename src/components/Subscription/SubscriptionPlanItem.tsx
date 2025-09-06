export default function SubscriptionPlanItem() {
  return (
    <div className="w-full rounded-lg border-2 border-orange-400 bg-white px-6 py-8">
      <div className="text-xl font-medium">Basic</div>
      <div className="my-6 text-sm">
        <span className="text-3xl font-semibold">$0</span> / Year
      </div>
      <p className="mb-4 text-xs text-gray-500">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
        reiciendis suscipit laborum adipisci. Laboriosam, ipsum eligendi
      </p>
      <ul className="mb-6">
        <li>Lorem ipsum dolor sit amet consectetur</li>
        <li>Lorem ipsum dolor sit amet consectetur</li>
        <li>Lorem ipsum dolor sit amet consectetur</li>
        <li>Lorem ipsum dolor sit amet consectetur</li>
      </ul>
      <button className="w-full rounded-full border-2 border-orange-400 bg-orange-400 px-4 py-2 text-lg font-semibold text-white">
        Continue
      </button>
    </div>
  )
}
