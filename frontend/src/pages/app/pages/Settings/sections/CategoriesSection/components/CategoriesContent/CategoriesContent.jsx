import { Section } from "@/components/sections/Section";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { getCategoriesByType } from "@/utils/category";
import { useEffect, useMemo, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";
import { CategoryItem } from "../CategoryItem";
import { Button } from "@/components/Button";
import { CategoryProvider } from "@/contexts";
import { formatEntityNameForUI } from "@/utils/formatting";
import { resetFetcher } from "@/services/router/utils";
import { isArrayTruthy } from "@/utils/array";
import CATEGORY from "@/constants/category";
import { ROUTES } from "@/constants";

export default function CategoriesContent({ type = "compact", openModal, className }) {
  const isExpanded = type === "expanded";

  const { userData: { categories } } = useRouteLoaderData("app");

  const fetcher = useFetcher({ key: "updateCategory" });

  const hasExpenseCategories = useMemo(
    () => isArrayTruthy(categories.filter(category => category.type === "expense")),
    [categories]
  )
  const hasIncomeCategories = useMemo(
    () => isArrayTruthy(categories.filter(category => category.type === "income")),
    [categories]
  )
  const hasCategories = hasExpenseCategories || hasIncomeCategories;

  // Perform cleanup for last category
  useEffect(() => {
    if (!hasExpenseCategories || !hasIncomeCategories) {
      resetFetcher(fetcher);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasExpenseCategories, hasIncomeCategories]);

  const [activeOption, setActiveOption] = useState(CATEGORY.DEFAULT_TYPE);
  const isExpenseCategories = activeOption === "expense";

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  function renderCategoriesEls(categories) {
    // Destructuring what is not needed 
    return categories.map(category => {
      const { rootCategoryId, createdAt, ...restOfCategory } = category;
      return (
        <CategoryProvider
          key={category.id}
          providedCategoryData={{
            ...restOfCategory,
            name: formatEntityNameForUI(category.name)
          }}
          providedType={category.type} // Providing the type explicitly so it can be locked for change
        >
          <CategoryItem
            action={ROUTES.SETTINGS}
            category={category}
            isExpanded={isExpanded}
          />
        </CategoryProvider>
      )
    })
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

        <Button size="l" className="mt-8 mx-auto" onClick={openModal} data-actionable="true">
          add category
        </Button>
      </ContentWidget>
    </Section>
  )
}