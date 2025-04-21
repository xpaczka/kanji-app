import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Table, TableBody, TableCell, TableRow } from "#/components/ui/table"
import { Button } from "#/components/ui/button"
import { createServerClient } from "#/app/_trpc/server-client"
import DashboardImage from "./DashboardImage"

export default async function DashboardLeaderboard() {
  const serverClient = await createServerClient()

  const { overallLeaderboard, learnLeaderboard, gamesLeaderboard } =
    await serverClient.leaderboard.getAllLeaderboards()

  return (
    <Tabs defaultValue="overall" className="w-full">
      <TabsList className="mb-6 flex gap-4">
        <TabsTrigger value="overall" asChild>
          <Button variant="secondary">Overall</Button>
        </TabsTrigger>
        <TabsTrigger value="learn" asChild>
          <Button variant="secondary">Learn</Button>
        </TabsTrigger>
        <TabsTrigger value="games" asChild>
          <Button variant="secondary">Games</Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overall">
        <Table>
          <TableBody>
            {overallLeaderboard.map(({ username, score }, index) => (
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
      </TabsContent>
      <TabsContent value="learn">
        <Table>
          <TableBody>
            {learnLeaderboard.map(({ username, score }, index) => (
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
      </TabsContent>
      <TabsContent value="games">
        <Table>
          <TableBody>
            {gamesLeaderboard.map(({ username, score }, index) => (
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
      </TabsContent>
    </Tabs>
  )
}
