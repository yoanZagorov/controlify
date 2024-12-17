import { Button } from "@/components/Button";
import { FormField } from "./components/FormField";
import { Section } from "../Section";
import cn from "classnames";

export default function SettingsSection({ fetcher, action, section, settings, isSpaceLimited }) {
  const settingEls = settings.map((setting, index) => (
    <FormField
      key={index}
      modal={setting.modal}
      settingWidgetProps={setting.settingWidgetProps}
    />
  ))

  const gridClasses = cn(
    "grid gap-8",
    isSpaceLimited ? "grid-cols-1" : "grid-cols-2"
  )

  return (
    <Section
      title="Settings"
      {...section}
    >
      <fetcher.Form method="post" action={action} className="flex flex-col">
        <div className={gridClasses}>
          {settingEls}
        </div>

        <Button
          type="submit"
          size="l"
          className="w-full mt-12 mx-auto max-w-72"
        >
          Save Changes
        </Button>
      </fetcher.Form>
    </Section>
  )
}