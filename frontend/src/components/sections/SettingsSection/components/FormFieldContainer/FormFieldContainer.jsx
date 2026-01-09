import { useModal } from '#hooks'

import { SelectModal } from '#components/modals/SelectModal'
import { FullScreenModalWrapper } from '#components/modal-wrappers/FullScreenModalWrapper'

// Provides the logic for form fields that open nested modals
export default function FormFieldContainer({ field, modal }) {
  const {
    modalState: [isModalOpen, setSelectModalOpen],
    hasTransitioned,
    modalRef,
  } = useModal()

  return (
    <>
      <field.Component
        {...field.props}
        controlProps={{
          ...field.props.controlProps,
          onClick: () => setSelectModalOpen(true),
        }}
      />

      {(isModalOpen || hasTransitioned) && (
        <FullScreenModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          layoutProps={{
            handleOverflow: false,
            ...(modal.height ? { height: modal.height } : {}),
          }}
          modalRef={modalRef}
        >
          <SelectModal name={field.props.name}>
            <modal.innerModal.Component
              closeModal={() => setSelectModalOpen(false)}
              state={modal.state}
              {...modal.innerModal.props}
            />
          </SelectModal>
        </FullScreenModalWrapper>
      )}
    </>
  )
}
