import { capitalize, capitalizeEveryWord } from "@/utils/str";
import { SvgIcon } from "@/components/SvgIcon";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useEffect, useRef } from "react";
import { useModal, useSelectInput } from "@/hooks";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SelectModal } from "@/components/modals/SelectModal";
import { Field } from "../HeaderModal/components/Field";

export default function FieldContainer({ field, modal }) {
  const {
    modalState: [isSelectModalOpen, setSelectModalOpen] = [undefined, undefined], // Accounting for cases where modal is null
    hasTransitioned,
    modalRef
  } = modal ? useModal({ isBlocking: modal.type?.blocking || false }) : {};

  const modalTypeConfig = modal ? { layout: "nested", blocking: false, ...modal.type } : {};

  function toggleModal() {
    if (modal) setSelectModalOpen(true);
  }

  return (
    <>
      <field.Component
        {...field.props}
        selectBtnProps={field.props.type === "select" ? { ...field.props.selectBtnProps, colorPalette: "secondaryDark", onClick: toggleModal } : null}
      />

      {modal && (isSelectModalOpen || hasTransitioned) &&
        <ModalWrapper
          type={modalTypeConfig}
          isModalOpen={isSelectModalOpen}
          hasTransitioned={hasTransitioned}
          minHeight={modal.minHeight}
          ref={modalRef}
        >
          <SelectModal name={field.props.name} >
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