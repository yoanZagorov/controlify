import { FullScreenModalWrapper } from "@/components/modal-wrappers/FullScreenModalWrapper";
import { NestedModalWrapper } from "@/components/modal-wrappers/NestedModalWrapper";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { useModal } from "@/hooks";

// This components handles just the modal logic. It doesn't handle deletion by itself - it must be used inside a form
export default function DeleteEntityHandlerContainer({ modalType = "fullScreen", entity, deleteEntityFetcher, deleteBtnComponent, isDeleteConfirmationBtnDisabled, parentModalRef = null }) {
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

  const modalWrapperProps = { isModalOpen, hasTransitioned, modalRef };
  const deleteConfirmationModalProps = {
    isFullScreen,
    entity,
    closeModal: () => setModalOpen(false),
    isDeleteConfirmationBtnDisabled
  };

  return (
    <>
      <deleteBtnComponent.Component {...deleteBtnComponent.props} onClick={() => setModalOpen(true)}>
        {deleteBtnComponent.text && deleteBtnComponent.text}
      </deleteBtnComponent.Component>

      {(isModalOpen || hasTransitioned) ?
        isFullScreen ? (
          <FullScreenModalWrapper {...modalWrapperProps}>
            <DeletionConfirmationModal {...deleteConfirmationModalProps} />
          </FullScreenModalWrapper>
        ) : (
          <NestedModalWrapper {...modalWrapperProps} parentModalRef={parentModalRef}>
            <DeletionConfirmationModal {...deleteConfirmationModalProps} />
          </NestedModalWrapper>
        ) : null
      }
    </>
  )
}