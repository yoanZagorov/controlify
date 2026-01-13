import cn from 'classnames'
import { useMemo } from 'react'
import { useFetcher } from 'react-router'

import { useCategory, useModal } from '#/hooks'
import { formatEntityNameForUI } from '#/utils/formatting'
import { SvgIcon } from '#/components/SvgIcon'
import { Button } from '#/components/Button'
import { DeleteEntityHandlerContainer } from '#/components/containers/DeleteEntityHandlerContrainer'
import { Form } from '#/components/Form'

import { CategoryContainer } from '../CategoryContainer'
import { IconDeleteBtn } from './components/IconDeleteBtn'

// Handles the UI display for a single category as well as the deletion
export default function CategoryItem({
  isExpanded,
  action,
  category: { id, type, iconName, name, color },
}) {
  const { categoryData, defaultCategoryData, resetCategoryData } = useCategory()

  const updateCategoryFetcher = useFetcher({ key: 'updateCategory' })
  const modal = useModal({ fetcher: updateCategoryFetcher })

  const deleteCategoryFetcher = useFetcher({ key: 'deleteCategory' })

  const {
    modalState: [isModalOpen, setModalOpen],
  } = modal

  // To do: Replace JSON.stringify() with a proper complex object deep compare function
  const hasCategoryDataChanged = useMemo(
    () => JSON.stringify(categoryData) !== JSON.stringify(defaultCategoryData),
    [categoryData],
  )

  // Avoids repetition
  const deleteCategoryFormProps = {
    fetcher: deleteCategoryFetcher,
    btn: { isBtn: false },
    fields: [
      { name: 'id', value: id },
      { name: 'type', value: type },
    ],
    className: 'ml-auto',
  }
  const deleteEntityHandlerContainerProps = {
    entity: 'category',
    deleteEntityFetcher: deleteCategoryFetcher,
    isDeleteConfirmationBtnDisabled:
      deleteCategoryFetcher.state === 'submitting' ||
      deleteCategoryFetcher.state === 'loading',
  }

  return (
    <CategoryContainer
      mode="edit"
      formProps={{ fetcher: updateCategoryFetcher, action }}
      submitBtn={{
        props: {
          value: 'updateCategory',
          disabled:
            updateCategoryFetcher.state === 'submitting' ||
            updateCategoryFetcher.state === 'loading' ||
            !hasCategoryDataChanged,
        },
        text: 'update category',
      }}
      modal={modal}
    >
      <div
        className="flex items-center gap-4 rounded-lg bg-gray-light p-3"
        data-actionable={true}
      >
        <button
          onClick={() => setModalOpen(true)}
          className={cn(
            'focus-gray-dark relative flex size-12 items-center justify-center rounded-full',
            isExpanded ? 'size-12' : 'size-10',
          )}
          style={{ backgroundColor: color }}
        >
          <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />

          {!isExpanded && (
            <div className="absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-gray-medium">
              <SvgIcon iconName="pen" className="size-3 fill-gray-dark" />
            </div>
          )}
        </button>

        <span
          className={cn(
            'font-semibold text-gray-dark',
            isExpanded ? 'text-base' : 'text-sm',
          )}
        >
          {formatEntityNameForUI(name)}
        </span>

        {isExpanded ? (
          <div className="ml-auto flex items-center justify-center gap-6">
            <Button
              colorPalette="secondaryDark"
              onClick={() => setModalOpen(true)}
            >
              Edit
            </Button>

            <Form {...deleteCategoryFormProps}>
              <DeleteEntityHandlerContainer
                {...deleteEntityHandlerContainerProps}
                deleteBtnComponent={{
                  Component: Button,
                  props: { colorPalette: 'dangerSecondary' },
                  text: 'Delete',
                }}
              />
            </Form>
          </div>
        ) : (
          <Form {...deleteCategoryFormProps}>
            <DeleteEntityHandlerContainer
              {...deleteEntityHandlerContainerProps}
              deleteBtnComponent={{ Component: IconDeleteBtn }}
            />
          </Form>
        )}
      </div>
    </CategoryContainer>
  )
}
