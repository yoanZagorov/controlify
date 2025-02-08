import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SvgIcon } from "@/components/SvgIcon";
import { useModal } from "@/hooks";

export default function DeleteEntityHandler({ entity, deleteEntityFetcher }) {
  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ isBlocking: false, fetcher: deleteEntityFetcher });

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="ml-auto flex justify-center items-center gap-6 size-10 min-w-10 rounded-md bg-gray-light focus-goldenrod"
      >
        <SvgIcon iconName="trash-can" className="size-6 fill-red-dark" />
      </button>

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          type={{
            layout: "nested"
          }}
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight="h-3/4"
        >
          <DeletionConfirmationModal
            entity={entity}
            closeModal={() => setModalOpen(false)}
          />
        </ModalWrapper>
      }
    </>
  )
}