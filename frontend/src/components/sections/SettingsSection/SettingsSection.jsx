import cn from "classnames";

import { isObjTruthy } from "@/utils/obj";

import { Form } from "@/components/Form";
import { Section } from "../Section";
import { SettingWidgetFormField } from "./components/SettingWidgetFormField";

import { DeleteEntityBtn } from "./components/DeleteEntityBtn";
import { DeleteEntityHandlerContainer } from "@/components/containers/DeleteEntityHandlerContrainer";
import { FormFieldContainer } from "./components/FormFieldContainer";

export default function SettingsSection({ entity, formProps, sectionProps, settings, deleteEntityFetcher = {}, isSpaceLimited }) {
  const isDeleteEntity = isObjTruthy(deleteEntityFetcher);

  // Slightly less performant to loop twice with the .filter and .map than a strandard loop, but way more readable
  const settingEls = settings.filter(option => option.field).map(({ field }, index) => {
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
          },
          text: "save changes",
        }}
        fields={settings.map(option => option.formData)}
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
          />
        )}
      </Form>
    </Section>
  )
}