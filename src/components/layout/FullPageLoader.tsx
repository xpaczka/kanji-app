import { Spinner, SpinnerContentProps } from "../ui/spinner"

export default function FullPageLoader({
  children,
  ...props
}: SpinnerContentProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="large" {...props}>
        {children}
      </Spinner>
    </div>
  )
}
