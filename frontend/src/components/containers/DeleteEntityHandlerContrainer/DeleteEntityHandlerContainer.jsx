import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { useModal } from "@/hooks";

export default function DeleteEntityHandlerContainer({ modalType, entity, deleteEntityFetcher, deleteBtnComponent }) {
  const modalTypeConfig = {
    layout: "fullscreen",
    blocking: true,
    ...modalType
  }

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ isBlocking: modalTypeConfig.blocking, fetcher: deleteEntityFetcher });

  return (
    <>
      <deleteBtnComponent.Component {...deleteBtnComponent.props} onClick={() => setModalOpen(true)} />

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          type={modalTypeConfig}
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight={modalTypeConfig.layout === "fullscreen" ? "h-[90%] ml:h-60" : "ls:h-3/4"}
        >
          {/* Height is like this because on mobile it's convinient for the button to be placed down, close to the user's fingers but 
           on desktop it would be better to be more central */}
          <DeletionConfirmationModal
            entity={entity}
            closeModal={() => setModalOpen(false)}
          />
        </ModalWrapper>
      }
    </>
  )
}