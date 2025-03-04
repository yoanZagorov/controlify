import { useModal } from "@/hooks";

import { SelectModal } from "@/components/modals/SelectModal";
import { NestedModalWrapper } from "@/components/modal-wrappers/NestedModalWrapper";

// Provides the logic for form fields that open nested modals
export default function FormFieldContainer({ field, modal, parentModalRef }) {
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
            handleOverflow: false,
            ...(modal.minHeight ? { minHeight: modal.minHeight } : {}),
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