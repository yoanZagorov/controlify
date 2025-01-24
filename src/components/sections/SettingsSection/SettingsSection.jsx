import { Button } from "@/components/Button";
import { FormField } from "./components/FormField";
import { Section } from "../Section";
import cn from "classnames";
import { Form } from "@/components/Form";
import { FieldContainer } from "@/components/modals/HeaderModal/components/FieldContainer";
import { SettingWidget } from "./components/SettingWidget";
import { SvgIcon } from "@/components/SvgIcon";
import { useModal } from "@/hooks";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";

export default function SettingsSection({ formProps, sectionProps, settings, isDeleteBtn, isSpaceLimited }) {
  const {
    modalState: [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = [],
    hasTransitioned: hasDeleteConfirmationModalTransitioned,
    modalRef: deleteConfirmationModalRef
  } = isDeleteBtn ? useModal({ fetcher: formProps.fetcher }) : {};

  const settingEls = settings.filter(option => option.field).map(({ field }, index) => (
    <FieldContainer
      key={index}
      field={{
        Component: SettingWidget,
        props: {
          name: field.name,
          ...field.props,
          selectBtnProps: field.props.type === "select" ? { colorPalette: "secondaryLight" } : null
        }
      }}
      modal={field.modal}
    />
  ))

  const classes = {
    grid: cn(
      "grid gap-8",
      isSpaceLimited ? "grid-cols-1" : "grid-cols-2"
    )
  }

  return (
    <Section {...sectionProps}>
      <Form
        {...formProps}
        className="flex flex-col"
        btn={{
          props: {
            ...formProps.btn.props,
            className: "w-full mt-12 mx-auto max-w-72",
          },
          text: "save changes",
        }}
        fields={settings.map(option => option.formData)}
      >

        <div className={classes.grid}>
          {settingEls}
        </div>

        {isDeleteBtn &&
          <>
            <button type="button" className="absolute top-0 right-0 size-6" onClick={() => setDeleteConfirmationModalOpen(true)}>
              <SvgIcon iconName="trash-can" className="size-full fill-red-light" />
            </button>

            {(isDeleteConfirmationModalOpen || hasDeleteConfirmationModalTransitioned) &&
              <ModalWrapper
                isModalOpen={isDeleteConfirmationModalOpen}
                hasTransitioned={hasDeleteConfirmationModalTransitioned}
                ref={deleteConfirmationModalRef}
                minHeight="h-[90%] ml:h-60"
              >
                <DeletionConfirmationModal
                  entity="wallet"
                  closeModal={() => setDeleteConfirmationModalOpen(false)}
                />
              </ModalWrapper>
            }
          </>
        }
      </Form>
    </Section>
  )
}