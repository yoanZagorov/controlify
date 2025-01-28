import { useEffect } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";

import { resetFetcher } from "@/services/router/utils";
import { walletsColors } from "@/utils/wallet";

import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useModal, useSettings, useWalletUpdate } from "@/hooks";
import { handleFullNameInputChange, handleWalletNameInputChange } from "@/utils/input";
import { capitalize } from "@/utils/str";
import { SvgIcon } from "@/components/SvgIcon";
import { CustomProfilePicType } from "./components/CustomProfilePicType";
import { Section } from "@/components/sections/Section";
import { OverallSettingsSection } from "./sections/OverallSettingsSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { Button } from "@/components/Button";
import { CategoryProvider, SettingsProvider } from "@/contexts";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { Form } from "@/components/Form";

export default function Settings() {
  const deleteAccountFetcher = useFetcher({ key: "deleteAccount" });
  const {
    modalState: [isDeletionConfirmationModalOpen, setDeletionConfirmationModalOpen] = [],
    hasTransitioned: hasDeletionConfirmationModalTransitioned,
    modalRef: deletionConfirmationModalRef
  } = useModal({ fetcher: deleteAccountFetcher });

  return (
    <>
      <div className="flex flex-col">
        <SettingsProvider>
          <OverallSettingsSection />
        </SettingsProvider>

        <CategoryProvider>
          <CategoriesSection className="mt-12" />
        </CategoryProvider>

        <Button size="l" colorPalette="danger" onClick={() => setDeletionConfirmationModalOpen(true)} className="mt-12 mx-auto">
          delete account
        </Button>
      </div>

      {(isDeletionConfirmationModalOpen || hasDeletionConfirmationModalTransitioned) &&
        <Form
          action="/app/settings"
          fetcher={deleteAccountFetcher}
          className="absolute"
        >
          <ModalWrapper
            isModalOpen={isDeletionConfirmationModalOpen}
            hasTransitioned={hasDeletionConfirmationModalTransitioned}
            ref={deletionConfirmationModalRef}
            minHeight="h-[27.5%]"
          >
            <DeletionConfirmationModal
              entity="account"
              closeModal={() => setDeletionConfirmationModalOpen(false)}
            />
          </ModalWrapper>
        </Form>
      }
    </>
  )
}
