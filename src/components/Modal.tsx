import { Dialog } from "@base-ui-components/react/dialog"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

type ModalProps = Dialog.Root.Props & {
  trigger: Dialog.Trigger.Props["render"]
}

export default function Modal({ trigger, children, ...props }: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger
        nativeButton={false}
        className="cursor-pointer"
        render={trigger}
      />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/20" />
        <Dialog.Popup className="fixed inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-lg rounded-md bg-white">
            {children}
            <Dialog.Close className="absolute top-4 right-4 cursor-pointer">
              <CloseRoundedIcon />
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
