import { FullScreenModalWrapper } from "@/components/modal-wrappers/FullScreenModalWrapper";
import { NestedModalWrapper } from "@/components/modal-wrappers/NestedModalWrapper";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { useModal } from "@/hooks";

// This components handles just the modal logic. It doesn't handle deletion by itself - it must be used inside a form
export default function DeleteEntityHandlerContainer({ modalType = "fullScreen", entity, deleteEntityFetcher, deleteBtnComponent, parentModalRef = null }) {
  const isFullScreen = modalType === "fullScreen";

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({
    type: modalType,
    fetcher: deleteEntityFetcher,
    ...(!isFullScreen ? { parentModalRef } : {})
  });

  return (
    <>
      <deleteBtnComponent.Component {...deleteBtnComponent.props} onClick={() => setModalOpen(true)}>
        {deleteBtnComponent.text && deleteBtnComponent.text}
      </deleteBtnComponent.Component>

      {(isModalOpen || hasTransitioned) ?
        isFullScreen ? (
          <FullScreenModalWrapper
            isModalOpen={isModalOpen}
            hasTransitioned={hasTransitioned}
            modalRef={modalRef}
          >
            <DeletionConfirmationModal
              isFullScreen={isFullScreen}
              entity={entity}
              closeModal={() => setModalOpen(false)}
            />
          </FullScreenModalWrapper>
        ) : (
          <NestedModalWrapper
            isModalOpen={isModalOpen}
            hasTransitioned={hasTransitioned}
            parentModalRef={parentModalRef}
            modalRef={modalRef}
          >
            <DeletionConfirmationModal
              isFullScreen={isFullScreen}
              entity={entity}
              closeModal={() => setModalOpen(false)}
            />
          </NestedModalWrapper>
        ) : null
      }
    </>
  )
}