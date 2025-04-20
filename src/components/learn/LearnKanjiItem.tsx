import { Card, CardContent, CardFooter } from "#/components/ui/card"
import { KanjiProficiency } from "#/schemas/kanji"

export default function LearnKanjiItem({
  kanji,
  level,
  proficiency
}: KanjiProficiency) {
  return (
    <Card className="flex-1">
      <CardContent className="mb-4 text-center text-6xl font-bold">
        {kanji}
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <div className="w-full border p-2 text-center">{level}</div>
        <div className="w-full border p-2 text-center">{proficiency}%</div>
      </CardFooter>
    </Card>
  )
}
