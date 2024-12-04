import { SelectModal } from "@/components/modals/SelectModal";
import { useInnerModal, useOutsideClick } from "@/hooks";
import { SettingWidget } from "../SettingWidget";
import { ModalWrapper } from "@/components/modals/ModalWrapper";

export default function FormField({ modal, settingWidgetProps }) {
  const [isSelectModalOpen, setSelectModalOpen, hasTransitioned] = useInnerModal(300);
  const modalRef = useOutsideClick(isSelectModalOpen, () => setSelectModalOpen(false));

  return modal ? (
    <>
      <SettingWidget {...settingWidgetProps} handleClick={() => setSelectModalOpen(true)} />

      {(isSelectModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isSelectModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
        >
          <SelectModal {...modal.props}>
            <modal.Component closeModal={() => setSelectModalOpen(false)} state={modal.state} />
          </SelectModal>
        </ModalWrapper>
      }
    </>
  ) : (
    <SettingWidget {...settingWidgetProps} />
  )
}
