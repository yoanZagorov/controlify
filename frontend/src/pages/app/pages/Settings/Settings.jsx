import { useEffect } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";

import { resetFetcher } from "@/services/router/utils";

import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useModal, useScrollToTop, useSettings, useWalletUpdate } from "@/hooks";
import { handleFullNameInputChange, handleWalletNameInputChange } from "@/utils/input";
import { capitalize } from "@/utils/str";
import { SvgIcon } from "@/components/SvgIcon";
import { Section } from "@/components/sections/Section";
import { OverallSettingsSection } from "./sections/OverallSettingsSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { Button } from "@/components/Button";
import { CategoryProvider, SettingsProvider } from "@/contexts";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { Form } from "@/components/Form";
import { DeleteEntityHandlerContainer } from "@/components/containers/DeleteEntityHandlerContrainer";

export default function Settings() {
  useScrollToTop();

  const deleteAccountFetcher = useFetcher({ key: "deleteAccount" });
  const { isSingleColLayout } = useLayout();

  return (
    <>
      <div className="flex flex-col">
        <SettingsProvider>
          <OverallSettingsSection />
        </SettingsProvider>

        <CategoryProvider>
          <CategoriesSection className="mt-12" />
        </CategoryProvider>

        <Form fetcher={deleteAccountFetcher} btn={{ isBtn: false }} className="mx-auto">
          <DeleteEntityHandlerContainer
            entity="account"
            deleteEntityFetcher={deleteAccountFetcher}
            deleteBtnComponent={{
              Component: Button,
              props: {
                size: "l",
                colorPalette: "danger",
                className: "mt-12"
              },
              text: "delete account"
            }}
          />
        </Form>
      </div>
    </>
  )
}
