import { useModal } from "@/hooks";

import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SelectModal } from "@/components/modals/SelectModal";

// The FormFieldContainer provides the logic for form fields that open nested modals
export default function FormFieldContainer({ field, modal }) {
  const {
    modalState: [isSelectModalOpen, setSelectModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ isBlocking: modal.type?.blocking || false });

  const modalTypeConfig = { layout: "nested", blocking: false, ...modal.type };

  return (
    <>
      <field.Component
        {...field.props}
        controlProps={{ ...field.props.controlProps, onClick: () => setSelectModalOpen(true) }}
      />

      {(isSelectModalOpen || hasTransitioned) &&
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