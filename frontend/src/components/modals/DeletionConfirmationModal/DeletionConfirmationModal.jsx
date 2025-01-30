import { capitalize } from "@/utils/str";
import { Button } from "@/components/Button";

export default function DeletionConfirmationModal({ entity, closeModal }) {
  // function handleFetcherSubmission() {
  //   console.log("submitting...")
  //   fetcher.submit(
  //     {
  //       id: entity.id,
  //       intent: `delete${capitalize(entity.name)}`
  //     },
  //     { method: "post", action })
  // }


  return (
    <div className="h-full px-6 py-8 rounded-t-lg ml:rounded-lg bg-gray-light">
      <h1 className="text-2xl text-gray-dark font-semibold">Delete {capitalize(entity)}?</h1>
      <p className="mt-6 text-sm text-gray-dark font-semibold">Are you sure you would like to do this? This action cannot be undone.</p>

      <div className="mt-8 flex gap-4">
        <Button
          type="button"
          colorPalette="secondaryDark"
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          colorPalette="dangerSecondary"
          name="intent"
          value={`delete${capitalize(entity)}`}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}