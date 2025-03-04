import { HTMLAttributes, ReactNode } from "react"

type DashboardCardItemProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    title: string
}

export default function DashboardCardItem({
    children,
    title,
    ...props
}: DashboardCardItemProps) {
    return (
        <div {...props}>
            <p className="mb-2">{title}</p>
            {children}
        </div>
    )
}
