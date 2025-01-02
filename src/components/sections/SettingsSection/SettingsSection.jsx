import { Button } from "@/components/Button";
import { FormField } from "./components/FormField";
import { Section } from "../Section";
import cn from "classnames";
import { Form } from "@/components/Form";
import { FieldContainer } from "@/components/modals/FieldContainer";
import { SettingWidget } from "./components/SettingWidget";
import { SvgIcon } from "@/components/SvgIcon";

export default function SettingsSection({ form, section, settings, isSpaceLimited }) {
  const settingEls = settings.map(({ field }, index) => (
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
    <Section {...section}>
      <Form
        fetcher={form.fetcher}
        action={form.action}
        className="flex flex-col"
        btn={{
          props: {
            className: "w-full mt-12 mx-auto max-w-72",
            value: form.btnValue
          },
          text: "save changes",
        }}
        fields={settings.map(option => option.formData)}
      >

        <div className={classes.grid}>
          {settingEls}
        </div>
      </Form>
    </Section>
  )
}