import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "#/components/ui/card"
import { cn } from "#/lib/utils"
import { ComponentProps, ReactNode } from "react"

type KnowledgeTestContainerProps = ComponentProps<"div"> & {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

export default function KnowledgeTestContainer({
  header,
  children,
  footer,
  ...props
}: KnowledgeTestContainerProps) {
  const { className } = props

  return (
    <Card
      className={cn([
        "min-w-[420px] text-center",
        ...(className ? [className] : [])
      ])}
      {...props}
    >
      <CardHeader>
        {typeof header === "string" ? (
          <CardTitle className="text-xl">{header}</CardTitle>
        ) : (
          header
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-center gap-4">{footer}</CardFooter>
    </Card>
  )
}
