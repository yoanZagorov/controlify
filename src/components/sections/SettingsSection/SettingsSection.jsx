import { Button } from "@/components/Button";
import { Section } from "../Section";
import { SettingWidget } from "./components/SettingWidget";
import { useFetcher } from "react-router";
import { SelectModal } from "@/components/modals/SelectModal";
import { FormField } from "./components/FormField";
import { SvgIcon } from "@/components/SvgIcon";

export default function SettingsSection({ action, section, settings }) {
  const settingEls = settings.map((setting, index) => (
    <FormField
      key={index}
      modal={setting.modal}
      settingWidgetProps={setting.settingWidgetProps}
    />
  ))

  const fetcher = useFetcher({ key: "updateWalletSettings" });

  return (
    <Section
      title="Settings"
      {...section}
    >
      <fetcher.Form method="post" className="flex flex-col gap-8 relative" action={action}>
        {settingEls}

        <Button
          type="submit"
          size="l"
          className="w-full mx-auto max-w-72"
        >
          Save Changes
        </Button>
        <SvgIcon iconName="flag-eu" className="" />

      </fetcher.Form>
    </Section>
  )
}