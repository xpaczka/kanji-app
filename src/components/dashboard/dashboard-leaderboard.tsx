import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import DashboardImage from './dashboard-image'
import { Button } from '../ui/button'
import { Leaderboard } from '#/app/api/leaderboard/route'

export default async function DashboardLeaderboard() {
  const leaderboardResponse = await fetch(
    'http://localhost:3000/api/leaderboard'
  )

  const { overall, learn, games } =
    (await leaderboardResponse.json()) as Leaderboard

  return (
    <Tabs defaultValue='overall' className='w-full'>
      <TabsList className='mb-6 flex gap-4'>
        <TabsTrigger value='overall' asChild>
          <Button variant='secondary'>Overall</Button>
        </TabsTrigger>
        <TabsTrigger value='learn' asChild>
          <Button variant='secondary'>Learn</Button>
        </TabsTrigger>
        <TabsTrigger value='games' asChild>
          <Button variant='secondary'>Games</Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='overall'>
        <Table>
          <TableBody>
            {overall
              .sort((a, b) => b.score - a.score)
              .map(({ username, score }, index) => (
                <TableRow key={username}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <DashboardImage />
                  </TableCell>
                  <TableCell className='w-full'>{username}</TableCell>
                  <TableCell className='text-right'>{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='learn'>
        <Table>
          <TableBody>
            {learn
              .sort((a, b) => b.score - a.score)
              .map(({ username, score }, index) => (
                <TableRow key={username}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <DashboardImage />
                  </TableCell>
                  <TableCell className='w-full'>{username}</TableCell>
                  <TableCell className='text-right'>{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='games'>
        <Table>
          <TableBody>
            {games
              .sort((a, b) => b.score - a.score)
              .map(({ username, score }, index) => (
                <TableRow key={username}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <DashboardImage />
                  </TableCell>
                  <TableCell className='w-full'>{username}</TableCell>
                  <TableCell className='text-right'>{score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}
