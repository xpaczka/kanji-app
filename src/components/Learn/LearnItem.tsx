"use client"

import { Input } from "@base-ui-components/react/input"
import { Form } from "@base-ui-components/react/form"
import { ChangeEvent, useState } from "react"
import { toHiragana, toRomaji } from "wanakana"

export type LearnItemProps = {
  kanji: string
  meanings?: string[]
  readings?: string[]
  getNextItem: () => void
}

export default function LearnItem({
  kanji,
  readings,
  meanings,
  getNextItem
}: LearnItemProps) {
  const [value, setValue] = useState("")

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (!!readings) {
      const parsedValue = toRomaji(value)
      setValue(toHiragana(parsedValue))
      return
    }

    if (!!meanings) {
      setValue(value)
    }
  }

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault()
        getNextItem()
      }}
    >
      <div className="flex justify-center">
        <div className="inline-flex aspect-square flex-col items-center justify-center rounded-md border-2 border-gray-200 bg-white p-12 shadow-md">
          <div className="mb-16 text-9xl font-bold">{kanji}</div>
          <div className="mb-2 text-sm text-gray-400">
            {!!readings ? "Reading" : "Meaning"}
          </div>
          <Input
            className="rounded-md border-2 border-gray-400 bg-white px-6 py-4 text-center text-xl"
            value={value}
            onChange={onInputChange}
          />
        </div>
      </div>
    </Form>
  )
}
