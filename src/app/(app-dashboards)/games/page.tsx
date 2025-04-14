"use client"

import { trpc } from "#/app/_trpc/client"
import DashboardActionItem from "#/components/dashboard/DashboardActionItem"
import DashboardCard from "#/components/dashboard/DashboardCard"
import DashboardImage from "#/components/dashboard/DashboardImage"
import { Label } from "#/components/ui/label"
import { Table, TableBody, TableCell, TableRow } from "#/components/ui/table"
import { useInitiateMemoGameSession } from "#/hooks/memo-game"

export default function Games() {
  const { data: leaderboard } = trpc.leaderboard.getLeaderboard.useQuery({
    key: "gamesLeaderboard"
  })

  const { initiateMemoGameSession } = useInitiateMemoGameSession()

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-8">
      <div className="col-start-1 col-end-3 row-start-1 row-end-2">
        <DashboardActionItem title="Memo" onClick={initiateMemoGameSession}>
          Polish your Kanji skill <br />
          with a quick memo games
        </DashboardActionItem>
      </div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-3">
        <DashboardCard title="Games overview">
          <div className="mb-4">
            <Label>Points earned</Label>
            <p className="text-lg font-bold">20,000</p>
          </div>
          <div className="mb-4">
            <Label>Time spent</Label>
            <p className="text-lg font-bold">4hrs</p>
          </div>
          <div>
            <Label>Games played</Label>
            <p className="text-lg font-bold">260</p>
          </div>
        </DashboardCard>
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <DashboardCard className="h-full text-center text-4xl font-bold">
          <div className="pt-16">More games coming soon</div>
        </DashboardCard>
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-3">
        <DashboardCard title="Leaderboard" className="h-full">
          <Table>
            <TableBody>
              {leaderboard &&
                leaderboard
                  .sort((a, b) => b.score - a.score)
                  .map(({ username, score }, index) => (
                    <TableRow key={username}>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell>
                        <DashboardImage />
                      </TableCell>
                      <TableCell className="w-full">{username}</TableCell>
                      <TableCell className="text-right">{score}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </DashboardCard>
      </div>
    </div>
  )
}
