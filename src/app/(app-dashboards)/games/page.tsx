import DashboardActionItem from '#/components/dashboard/dashboard-action-item'
import DashboardCard from '#/components/dashboard/dashboard-card'
import { Label } from '#/components/ui/label'

export default function Games() {
  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>Games</h1>
      <div className='grid grid-cols-3 grid-rows-2 gap-8'>
        <div className='col-start-1 col-end-3 row-start-1 row-end-2'>
          <DashboardActionItem title='Memo'>
            Polish your Kanji skill <br />
            with a quick memo games
          </DashboardActionItem>
        </div>
        <div className='col-start-1 col-end-2 row-start-2 row-end-3'>
          <DashboardCard title='Games overview'>
            <div className='mb-4'>
              <Label>Points earned</Label>
              <p className='text-lg font-bold'>20,000</p>
            </div>
            <div className='mb-4'>
              <Label>Time spent</Label>
              <p className='text-lg font-bold'>4hrs</p>
            </div>
            <div>
              <Label>Games played</Label>
              <p className='text-lg font-bold'>260</p>
            </div>
          </DashboardCard>
        </div>
        <div className='col-start-2 col-end-3 row-start-2 row-end-3'>
          <DashboardCard className='text-center text-4xl font-bold h-full'>
            <div className='pt-16'>More games coming soon</div>
          </DashboardCard>
        </div>
      </div>
    </>
  )
}
