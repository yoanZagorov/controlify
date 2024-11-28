import { Button } from "@/components/Button";
import { Section } from "../Section";
import { SettingWidget } from "./components/SettingWidget";

export default function SettingsSection({ section, settings }) {
  const settingEls = settings.map((setting, index) => (
    <SettingWidget key={index} {...setting} />
  ))

  return (
    <Section
      title="Settings"
      contentClassName="flex flex-col gap-8"
      {...section}
    >
      {settingEls}

      <Button
        size="l"
        className="w-full mx-auto max-w-72"
      >
        Save Changes
      </Button>
    </Section>
  )
}