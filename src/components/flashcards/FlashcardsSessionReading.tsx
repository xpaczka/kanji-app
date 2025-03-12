import { ReactNode } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip'

type FlashcardsSessionReadingProps = {
  children: ReactNode
  tooltipContent: string
}

export default function FlashcardsSessionReading({
  children,
  tooltipContent,
}: FlashcardsSessionReadingProps) {
  return (
    <div className='flex items-center gap-1'>
      <p className='text-sm'>{children}</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='flex items-center'>
            <InfoIcon color='disabled' fontSize='small' />
          </TooltipTrigger>
          <TooltipContent className='max-w-[250px] text-center'>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
