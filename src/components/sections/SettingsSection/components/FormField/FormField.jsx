import { useModal } from "@/hooks";

import { SelectModal } from "@/components/modals/SelectModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SettingWidget } from "../SettingWidget";

export default function FormField({ modal, settingWidgetProps }) {
  const {
    modalState: [isSelectModalOpen, setSelectModalOpen] = [undefined, undefined], // Accounting for cases where modal is null
    hasTransitioned,
    modalRef
  } = modal ? useModal({ type: modal.type }) : {};

  return (
    <>
      <SettingWidget
        {...settingWidgetProps}
        handleClick={modal ? () => setSelectModalOpen(true) : null}
      />

      {modal && (isSelectModalOpen || hasTransitioned) &&
        <ModalWrapper
          type={{
            blocking: modal.type === "blocking"
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
