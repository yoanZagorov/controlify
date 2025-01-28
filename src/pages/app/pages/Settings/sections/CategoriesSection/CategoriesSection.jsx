import { Button } from "@/components/Button";
import { Section } from "@/components/sections/Section";
import { SvgIcon } from "@/components/SvgIcon";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { categoriesColors, categoriesIconNames, getCategoriesByType } from "@/utils/category";
import { formatEntityName } from "@/utils/formatting";
import { capitalize } from "@/utils/str";
import { useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";
import { CategoryItem } from "./components/CategoryItem";
import { Content } from "./components/Content";
import { useCategory, useLayout, useModal } from "@/hooks";
import { CategoryTypeModal } from "@/components/modals/CategoryTypeModal";
import { IconModal } from "@/components/modals/IconModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { HeaderModal } from "@/components/modals/HeaderModal";
import cn from "classnames";
import { Select } from "@/components/Select";
import { CustomIconComponent } from "./components/CustomIconComponent";
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