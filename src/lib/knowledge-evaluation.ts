import { KanjiItemJlptLevel } from "#/database/schema"

const KNOWLEDGE_TEST_LEVEL_SCALE: Record<KanjiItemJlptLevel, number> = {
  "jlpt-n1": 0,
  "jlpt-n2": 0,
  "jlpt-n3": 0,
  "jlpt-n4": 0,
  "jlpt-n5": 0
}

export const evaluateKnowledgeTestItemScore = (
  correctAnswer: string,
  userAnswer: string,
  level: KanjiItemJlptLevel
) => (correctAnswer === userAnswer ? KNOWLEDGE_TEST_LEVEL_SCALE[level] : 0)
