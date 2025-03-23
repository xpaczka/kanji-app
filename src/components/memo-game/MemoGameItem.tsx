import { Button } from '#/components/ui/button'

type MemoGameItemProps = {
  content: string
  isRevealed: boolean
  onClick: () => void
}

export default function MemoGameItem({
  content,
  isRevealed,
  onClick,
}: MemoGameItemProps) {
  return (
    <Button asChild variant='outline' onClick={onClick}>
      <div className='flex justify-center items-center aspect-square h-24 w-24 border rounded-sm'>
        {isRevealed ? content : ''}
      </div>
    </Button>
  )
}
