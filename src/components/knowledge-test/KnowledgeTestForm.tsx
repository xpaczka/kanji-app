import KnowledgeTestContainer from "./KnowledgeTestContainer"
import KnowledgeTestFormOptions from "./KnowledgeTestFormOptions"

export default function KnowledgeTestForm() {
  return (
    <KnowledgeTestContainer
      header="jlpt-n5"
      footer={<KnowledgeTestFormOptions />}
    >
      {/* TODO: Display currently revieved kanji */}
      <div className="py-12 text-6xl font-bold">私</div>
    </KnowledgeTestContainer>
  )
}
