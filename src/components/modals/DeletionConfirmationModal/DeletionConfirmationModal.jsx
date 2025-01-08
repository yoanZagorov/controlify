import { Button } from "@/components/Button";
import { capitalize } from "@/utils/str";

export default function DeletionConfirmationModal({ entity, closeModal }) {
  return (
    <div className="h-full px-6 py-8 bg-gray-light">
      <h1 className="text-2xl text-gray-dark font-semibold">Delete {capitalize(entity.name)}?</h1>
      <p className="mt-6 text-sm text-gray-dark font-semibold">Are you sure you would like to do this? This action cannot be undone.</p>

      <div className="mt-8 flex gap-4">
        <Button
          colorPalette="secondaryDark"
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          colorPalette="dangerSecondary"
          name="intent"
          value={`delete${capitalize(entity.name)}`}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}