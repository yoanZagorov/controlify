import { useEffect } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";

import { resetFetcher } from "@/services/router/utils";
import { walletsColors } from "@/utils/wallet";

import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useSettings, useWalletUpdate } from "@/hooks";
import { handleFullNameInputChange, handleWalletNameInputChange } from "@/utils/input";
import { capitalize } from "@/utils/str";
import { SvgIcon } from "@/components/SvgIcon";
import { CustomProfilePicType } from "./components/CustomProfilePicType";
import { Section } from "@/components/sections/Section";
import { OverallSettingsSection } from "./sections/OverallSettingsSection";
import { CategoriesSection } from "./sections/CategoriesSection";

export default function Settings() {
  const { isSingleColLayout } = useLayout();

  const fetcher = useFetcher({ key: "updateSettings" });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state])

  return (
    <div>
      <OverallSettingsSection />

      <CategoriesSection className="mt-12" />
    </div>
  )
}
