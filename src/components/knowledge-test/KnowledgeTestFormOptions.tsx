import { Button } from "#/components/ui/button"

// TODO: Pass possible options for kanji
export default function KnowledgeTestFormOptions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button>Option 1</Button>
      <Button>Option 2</Button>
      <Button>Option 3</Button>
      <Button>Option 4</Button>
    </div>
  )
}
