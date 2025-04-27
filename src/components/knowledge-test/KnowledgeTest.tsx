"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "#/components/ui/card"
import { Button } from "#/components/ui/button"
import { useCallback } from "react"

export default function KnowledgeTest() {
  const checkKnowledgeHandler = useCallback(() => {}, [])

  const skipHandler = useCallback(() => {}, [])

  return (
    <div className="grid h-[100vh] place-items-center p-12">
      <Card className="min-w-[420px] text-center">
        <CardHeader>
          <CardTitle className="text-xl">Check your knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          Do you want to test your knowledge <br />
          or skip and start from the beginning?
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={checkKnowledgeHandler}>Let&apos;s go</Button>
          <Button onClick={skipHandler} variant="secondary">
            Skip
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
