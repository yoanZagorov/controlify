import { useModal } from "@/hooks";

import { SelectModal } from "@/components/modals/SelectModal";
import { NestedModalWrapper } from "@/components/modal-wrappers/NestedModalWrapper";

// The FormFieldContainer provides the logic for form fields that open nested modals
export default function FormFieldContainer({ field, parentModalRef, modal }) {
  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ type: "nested", parentModalRef });

  return (
    <>
      <field.Component
        {...field.props}
        controlProps={{ ...field.props.controlProps, onClick: () => setModalOpen(true) }}
      />

      {(isModalOpen || hasTransitioned) &&
        <NestedModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          layoutProps={{
            minHeight: modal.minHeight,
            handleOverflow: false
          }}
          parentModalRef={parentModalRef}
          modalRef={modalRef}
        >
          <SelectModal name={field.props.name} >
            <modal.innerModal.Component
              closeModal={() => setModalOpen(false)}
              state={modal.state}
              {...modal.innerModal.props}
            />
          </SelectModal>
        </NestedModalWrapper>
      }
    </>
  )
}