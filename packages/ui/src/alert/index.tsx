// Imports
import * as A from '@radix-ui/react-alert-dialog'

// UI imports
import { Button } from '../button'
import './style.css'

// Component
export const Alert = ({
  trigger,
  description,
  action = null,
  onAction,
  onCancel = null,
  ...props
}) => {
  // render
  return (
    <A.Root {...props}>
      <A.Trigger asChild>{trigger}</A.Trigger>

      <A.Portal>
        <A.Overlay className='AlertDialogOverlay'>
          <A.Content className='AlertDialogContent'>
            <A.Description className='AlertDialogDescription'>
              {description}
            </A.Description>

            <div className='AlertDialogActions'>
              {action && (
                <A.Action asChild>
                  <div>
                    <Button onClick={onAction} title={action} />
                  </div>
                </A.Action>
              )}

              <A.Cancel asChild>
                <div>
                  <Button title='Cancel' variant='text' onClick={onCancel} />
                </div>
              </A.Cancel>
            </div>
          </A.Content>
        </A.Overlay>
      </A.Portal>
    </A.Root>
  )
}
