import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded"
import NavigationMenuPopupItem from "./NavigationMenuPopupItem"
import { ROUTES } from "#/constants"

export default function NavigationMenuSubscription() {
  return (
    <NavigationMenuPopupItem
      Icon={PaymentRoundedIcon}
      content="Subscription"
      href={ROUTES.subscription}
    />
  )
}
