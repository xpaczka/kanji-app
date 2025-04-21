"use client"

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "#/components/ui/dialog"
import { Button } from "#/components/ui/button"
import SettingsIcon from "@mui/icons-material/Settings"
import { Switch } from "#/components/ui/switch"
import { Label } from "#/components/ui/label"
import { useCallback } from "react"
import { trpc } from "#/app/_trpc/client"
import { useUserRomajiPreferences } from "#/hooks/user"

// TODO: Use react hooks form
export default function UserPreferences() {
  const { showRomaji, setShowRomaji } = useUserRomajiPreferences()

  const { mutate: updateUserPreferences } =
    trpc.user.updateUserPreferences.useMutation()

  // TODO: Implement multiple preferences update
  const savePreferencesHandler = useCallback(() => {
    updateUserPreferences({ showRomaji })
  }, [updateUserPreferences, showRomaji])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Preferences</DialogTitle>
        </DialogHeader>
        <DialogDescription className="my-6" asChild>
          <div className="flex w-full items-center justify-between gap-4">
            <Label className="text-black">Show romaji</Label>
            <Switch
              checked={showRomaji}
              onCheckedChange={(value) => setShowRomaji(value)}
            />
          </div>
        </DialogDescription>
        <DialogFooter>
          <div className="flex w-full justify-center">
            <DialogClose asChild>
              <Button onClick={savePreferencesHandler}>Confirm</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
