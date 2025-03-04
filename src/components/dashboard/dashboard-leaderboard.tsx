import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import DashboardImage from "./dashboard-image"
import { Button } from "../ui/button"

const OVERALL_LEADERBOARD = [
    { username: "user1", score: 24500 },
    { username: "user2", score: 21500 },
    { username: "user3", score: 37500 },
    { username: "user4", score: 1890 },
    { username: "user5", score: 24010 },
    { username: "user6", score: 14100 },
]

const LEARN_LEADERBOARD = [
    { username: "learner1", score: 9800 },
    { username: "learner2", score: 15600 },
    { username: "learner3", score: 13450 },
    { username: "learner4", score: 4500 },
    { username: "learner5", score: 12100 },
    { username: "learner6", score: 8900 },
]

const GAMES_LEADERBOARD = [
    { username: "gamer1", score: 40500 },
    { username: "gamer2", score: 38200 },
    { username: "gamer3", score: 42750 },
    { username: "gamer4", score: 19800 },
    { username: "gamer5", score: 25600 },
    { username: "gamer6", score: 31200 },
]

export default function DashboardLeaderboard() {
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
                        {OVERALL_LEADERBOARD.sort(
                            (a, b) => b.score - a.score,
                        ).map(({ username, score }, index) => (
                            <TableRow key={username}>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>
                                    <DashboardImage />
                                </TableCell>
                                <TableCell className="w-full">
                                    {username}
                                </TableCell>
                                <TableCell className="text-right">
                                    {score}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="learn">
                <Table>
                    <TableBody>
                        {LEARN_LEADERBOARD.sort(
                            (a, b) => b.score - a.score,
                        ).map(({ username, score }, index) => (
                            <TableRow key={username}>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>
                                    <DashboardImage />
                                </TableCell>
                                <TableCell className="w-full">
                                    {username}
                                </TableCell>
                                <TableCell className="text-right">
                                    {score}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="games">
                <Table>
                    <TableBody>
                        {GAMES_LEADERBOARD.sort(
                            (a, b) => b.score - a.score,
                        ).map(({ username, score }, index) => (
                            <TableRow key={username}>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>
                                    <DashboardImage />
                                </TableCell>
                                <TableCell className="w-full">
                                    {username}
                                </TableCell>
                                <TableCell className="text-right">
                                    {score}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
    )
}
