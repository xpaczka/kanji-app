import { Avatar } from "@base-ui-components/react/avatar"

export default function NavigationMenuAvatar() {
  return (
    <Avatar.Root className="cursor-pointer">
      <Avatar.Image
        src="avatar.jpeg"
        className="h-14 w-14 rounded-full border-2 border-gray-200"
      />
    </Avatar.Root>
  )
}
