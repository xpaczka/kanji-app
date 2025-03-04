import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import DashboardImage from './dsahboard-image'
import { Button } from '../ui/button'

const LEADERBOARD_DATA = [
  { username: 'user1', score: 24500 },
  { username: 'user2', score: 21500 },
  { username: 'user3', score: 37500 },
  { username: 'user4', score: 1890 },
  { username: 'user5', score: 24010 },
  { username: 'user6', score: 14100 },
]

export default function DashboardLeaderboard() {
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
            {LEADERBOARD_DATA.sort((a, b) => b.score - a.score).map(
              ({ username, score }, index) => (
                <TableRow key={username}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <DashboardImage />
                  </TableCell>
                  <TableCell className='w-full'>{username}</TableCell>
                  <TableCell className='text-right'>{score}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='learn'>
        <Table>
          <TableBody>
            {LEADERBOARD_DATA.sort((a, b) => b.score - a.score).map(
              ({ username, score }, index) => (
                <TableRow key={username}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <DashboardImage />
                  </TableCell>
                  <TableCell className='w-full'>{username}</TableCell>
                  <TableCell className='text-right'>{score}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='games'>
        {' '}
        <Table>
          <TableBody>
            {LEADERBOARD_DATA.sort((a, b) => b.score - a.score).map(
              ({ username, score }, index) => (
                <TableRow key={username}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>
                    <DashboardImage />
                  </TableCell>
                  <TableCell className='w-full'>{username}</TableCell>
                  <TableCell className='text-right'>{score}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}
