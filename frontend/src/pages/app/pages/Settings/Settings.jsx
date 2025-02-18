import { useFetcher } from "react-router";
import { useScrollToTop } from "@/hooks";
import { OverallSettingsSection } from "./sections/OverallSettingsSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { Button } from "@/components/Button";
import { CategoryProvider, SettingsProvider } from "@/contexts";
import { Form } from "@/components/Form";
import { DeleteEntityHandlerContainer } from "@/components/containers/DeleteEntityHandlerContrainer";

export default function Settings() {
  useScrollToTop();
  const deleteAccountFetcher = useFetcher({ key: "deleteAccount" });

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
                className: "mt-12",
                "data-actionable": true
              },
              text: "delete account"
            }}
          />
        </Form>
      </div>
    </>
  )
}
