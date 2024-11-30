import { SelectModal } from "@/components/modals/SelectModal";
import { useInnerModal } from "@/hooks";
import { SettingWidget } from "../SettingWidget";

export default function FormField({ modal, settingWidgetProps }) {
  const [isSelectModalOpen, setSelectModalOpen, hasTransitioned] = useInnerModal(300);

  return modal ? (
    <>
      <SettingWidget {...settingWidgetProps} handleClick={() => setSelectModalOpen(true)} />

      {(isSelectModalOpen || hasTransitioned) &&
        <SelectModal
          isSelectModalOpen={isSelectModalOpen}
          closeModal={() => setSelectModalOpen(false)}
          hasTransitioned={hasTransitioned}
          {...modal.props}
        >
          <modal.Component closeModal={() => setSelectModalOpen(false)} state={modal.state} />
        </SelectModal>
      }
    </>
  ) : (
    <SettingWidget {...settingWidgetProps} />
  )
}
