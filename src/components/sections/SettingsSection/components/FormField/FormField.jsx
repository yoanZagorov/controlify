import { SelectModal } from "@/components/modals/SelectModal";
import { useInnerModal, useModal, useOutsideClick } from "@/hooks";
import { SettingWidget } from "../SettingWidget";
import { ModalWrapper } from "@/components/modals/ModalWrapper";

export default function FormField({ modal, settingWidgetProps }) {
  const {
    modalState: [isSelectModalOpen, setSelectModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ type: "non-blocking" });

  return (
    <>
      <SettingWidget
        {...settingWidgetProps}
        handleClick={modal ? () => setSelectModalOpen(true) : null}
      />

      {modal && (isSelectModalOpen || hasTransitioned) &&
        <ModalWrapper
          type={{
            blocking: false
          }}
          isModalOpen={isSelectModalOpen}
          hasTransitioned={hasTransitioned}
          minHeight={modal.minHeight}
          ref={modalRef}
        >
          <SelectModal {...modal.selectModalProps}>
            <modal.innerModal.Component
              closeModal={() => setSelectModalOpen(false)}
              state={modal.state}
              {...modal.innerModal.props}
            />
          </SelectModal>
        </ModalWrapper>
      }
    </>
  )
}
