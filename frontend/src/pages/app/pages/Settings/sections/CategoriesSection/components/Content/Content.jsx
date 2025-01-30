import { Section } from "@/components/sections/Section";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { getCategoriesByType } from "@/utils/category";
import { useEffect, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";
import { CategoryItem } from "../CategoryItem";
import { Button } from "@/components/Button";
import { CategoryProvider } from "@/contexts";
import { formatEntityName } from "@/utils/formatting";
import { resetFetcher } from "@/services/router/utils";
import { useLayout } from "@/hooks";
import cn from "classnames";

export default function Content({ type = "compact", openModal, className }) {
  const isExpanded = type === "expanded";

  const fetcher = useFetcher({ key: "updateCategory" });

  const { userData: { categories } } = useRouteLoaderData("app");
  const hasExpenseCategories = categories.filter(category => category.type === "expense").length > 0;
  const hasIncomeCategories = categories.filter(category => category.type === "income").length > 0;
  const hasCategories = hasExpenseCategories || hasIncomeCategories;

  // Perform cleanup for last category
  useEffect(() => {
    if (!hasCategories) {
      resetFetcher(fetcher);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasCategories]);

  const [activeOption, setActiveOption] = useState("expense");
  const isExpenseCategories = activeOption === "expense";

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  function renderCategoriesEls(categories) {
    return categories.map((category) =>
      <CategoryProvider
        key={category.id}
        prepopulatedCategoryData={{
          ...category,
          name: formatEntityName(category.name)
        }}
        type={category.type}
      >
        <CategoryItem
          action="/app/settings"
          category={category}
          isExpanded={isExpanded}
        />
      </CategoryProvider>
    );
  }

  const expenseCategoriesEls = hasExpenseCategories ? renderCategoriesEls(expenseCategories) : null;
  const incomeCategoriesEls = hasIncomeCategories ? renderCategoriesEls(incomeCategories) : null;

  return (
    <Section
      title="Categories"
      className={className}
    >
      <ContentWidget
        iconName="categories"
        title="all"
        content={{
          hasBackground: false,
          className: "mt-4 flex flex-col"
        }}
      >
        <CategoriesTypeToggleSwitch
          activeOption={activeOption}
          handleToggle={() => setActiveOption(prev => prev === "expense" ? "income" : "expense")}
          className="max-w-lg"
        />

        {hasCategories ? (
          <div className="mt-6 flex flex-col gap-4">
            {isExpenseCategories
              ? expenseCategoriesEls
              : incomeCategoriesEls
            }
          </div>
        ) : (
          <Notification msgType="notification" className="self-center w-full max-w-80">
            Oops... It looks like you don't have any categories left. Add one now!
          </Notification>
        )
        }

        <Button size="l" className="mt-8 mx-auto" onClick={openModal}>
          add category
        </Button>
      </ContentWidget>
    </Section>
  )
}