import { Button } from '#/components/ui/button'

export default function AuthProviders() {
  return (
    <div className='flex gap-2'>
      <Button variant='secondary'>Google</Button>
      <Button variant='secondary'>Facebook</Button>
      <Button variant='secondary'>Discord</Button>
    </div>
  )
}
