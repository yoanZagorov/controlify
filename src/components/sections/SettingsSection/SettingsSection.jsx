import { Button } from "@/components/Button";
import { Section } from "../Section";
import { SettingWidget } from "./components/SettingWidget";
import { useFetcher } from "react-router";

export default function SettingsSection({ section, settings, action }) {
  const settingEls = settings.map((setting, index) => (
    <SettingWidget key={index} {...setting} />
  ))

  const fetcher = useFetcher({ key: "updateWalletSettings" });

  return (
    <Section
      title="Settings"
      {...section}
    >
      <fetcher.Form method="post" className="flex flex-col gap-8" action={action}>
        {settingEls}

        <Button
          type="submit"
          size="l"
          className="w-full mx-auto max-w-72"
        >
          Save Changes
        </Button>
      </fetcher.Form>
    </Section>
  )
}