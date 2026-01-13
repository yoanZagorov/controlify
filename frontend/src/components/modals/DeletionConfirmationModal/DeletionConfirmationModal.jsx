import cn from 'classnames'
import { capitalize } from '#/utils/str'
import { Button } from '#/components/Button'

// Used to delete an entity
export default function DeletionConfirmationModal({
  isFullScreen = true,
  entity,
  closeModal,
  isDeleteConfirmationBtnDisabled = false,
}) {
  return (
    <div
      className={cn(
        'flex-1 overflow-auto text-balance rounded-t-lg border-gray-dark bg-gray-light px-6 py-8 text-center ml:rounded-lg',
        isFullScreen ? 'border' : 'border-t',
      )}
    >
      <h1 className="text-2xl font-semibold text-gray-dark">
        Delete {capitalize(entity)}?
      </h1>
      <p className="mt-6 text-sm font-semibold text-gray-dark">
        Are you sure you would like to do this? This action cannot be undone.
      </p>

      <div className="mx-auto mt-8 flex justify-center gap-4">
        <Button type="button" colorPalette="secondaryDark" onClick={closeModal}>
          Cancel
        </Button>

        <Button
          type="submit"
          colorPalette="dangerSecondary"
          name="intent"
          value={`delete${capitalize(entity)}`}
          disabled={isDeleteConfirmationBtnDisabled}
          className={cn(isDeleteConfirmationBtnDisabled && 'opacity-50')}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
