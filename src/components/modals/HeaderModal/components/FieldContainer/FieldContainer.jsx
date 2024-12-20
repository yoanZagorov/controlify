import { capitalize, capitalizeEveryWord } from "@/utils/str";
import { SvgIcon } from "@/components/SvgIcon";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useEffect, useRef } from "react";
import { useModal, useSelectInput } from "@/hooks";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SelectModal } from "@/components/modals/SelectModal";
import { Field } from "../Field";

export default function FieldContainer({ fieldProps, modal }) {
  const {
    modalState: [isSelectModalOpen, setSelectModalOpen] = [undefined, undefined], // Accounting for cases where modal is null
    hasTransitioned,
    modalRef
  } = modal ? useModal({ type: modal.type || "non-blocking" }) : {};

  function toggleModal() {
    if (modal) setSelectModalOpen(true);
  }

  return (
    <>
      <Field
        {...fieldProps}
        selectBtnProps={fieldProps.type === "select" ? { colorPalette: "secondaryDark", onClick: toggleModal } : null}
      />

      {modal && (isSelectModalOpen || hasTransitioned) &&
        <ModalWrapper
          type={{
            layout: "nested",
            blocking: false
          }}
          isModalOpen={isSelectModalOpen}
          hasTransitioned={hasTransitioned}
          minHeight={modal.minHeight}
          ref={modalRef}
        >
          <SelectModal name={fieldProps.name} >
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