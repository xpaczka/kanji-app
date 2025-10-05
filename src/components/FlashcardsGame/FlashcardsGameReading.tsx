import { ReactNode } from "react"
import InfoIcon from "@mui/icons-material/Info"
import { Tooltip } from "@base-ui-components/react/tooltip"

type FlashcardsGameReadingProps = {
  children: ReactNode
  tooltipContent: string
}

export default function FlashcardsGameReading({
  children,
  tooltipContent
}: FlashcardsGameReadingProps) {
  return (
    <div className="flex items-center gap-1">
      <p className="text-sm text-gray-600">{children}</p>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger className="flex items-center">
            <InfoIcon color="disabled" fontSize="small" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup className="max-w-[250px] rounded-md bg-black px-4 py-2 text-center text-white">
                <p>{tooltipContent}</p>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}
