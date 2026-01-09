import cn from "classnames";

import { isObjTruthy } from "#utils/obj";

import { Form } from "#components/Form";
import { DeleteEntityHandlerContainer } from "#components/containers/DeleteEntityHandlerContrainer";

import { Section } from "../Section";
import { SettingWidgetFormField } from "./components/SettingWidgetFormField";
import { DeleteEntityBtn } from "./components/DeleteEntityBtn";
import { FormFieldContainer } from "./components/FormFieldContainer";

// A section that the user can use to change settings. Used in the settings and wallet/settings
export default function SettingsSection({ entity, formProps, sectionProps, fields, deleteEntityFetcher = {}, isSpaceLimited }) {
  const isDeleteEntity = isObjTruthy(deleteEntityFetcher);
  const isFetcherSubmitting = formProps.fetcher.state === "submitting" || formProps.fetcher.state === "loading";

  const settingEls = fields.map((field, index) => {
    return field.modal ? (
      <FormFieldContainer
        key={index}
        field={{
          Component: SettingWidgetFormField,
          props: {
            name: field.name,
            ...field.props,
            controlProps: { ...field.props.controlProps, colorPalette: "secondaryLight" }
          }
        }}
        modal={field.modal}
      />
    ) : (
      <SettingWidgetFormField key={index} name={field.name} {...field.props} />
    )
  })

  return (
    <Section {...sectionProps}>
      <Form
        {...formProps}
        className="flex flex-col"
        btn={{
          props: {
            ...formProps.btn.props,
            className: "w-full mt-12 mx-auto max-w-72",
            disabled: isFetcherSubmitting
          },
          text: "save changes",
        }}
      >

        <div className={cn("grid gap-8", isSpaceLimited ? "grid-cols-1" : "grid-cols-2")}>
          {settingEls}
        </div>

        {isDeleteEntity && (
          <DeleteEntityHandlerContainer
            entity={entity}
            deleteEntityFetcher={deleteEntityFetcher}
            deleteBtnComponent={{
              Component: DeleteEntityBtn
            }}
            isDeleteConfirmationBtnDisabled={isFetcherSubmitting}
          />
        )}
      </Form>
    </Section>
  )
}