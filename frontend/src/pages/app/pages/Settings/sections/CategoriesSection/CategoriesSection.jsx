import { useFetcher, useRouteLoaderData } from "react-router";
import { Content } from "./components/Content";
import { useCategory, useLayout, useModal } from "@/hooks";
import cn from "classnames";
import { CategoryContainer } from "@/components/containers/CategoryContainer";

export default function CategoriesSection({ className }) {
  const { isSingleColLayout } = useLayout();

  const { categoryData: { iconName }, resetCategoryData } = useCategory();

  const fetcher = useFetcher({ key: "addCategory" });

  const modal = useModal({ fetcher, resetModalData: resetCategoryData });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <CategoryContainer
      fetcher={fetcher}
      modal={modal}
      action="/app/settings"
      submitBtn={{
        text: "add category",
        props: {
          value: "addCategory",
          disabled: !iconName
        }
      }}
    >
      <Content
        openModal={() => setModalOpen(true)}
        type={isSingleColLayout ? "compact" : "expanded"}
        className={cn("mt-12", className)}
      />
    </CategoryContainer>
  )
}