import { useMemo } from 'react'
import { useRouteLoaderData } from 'react-router'

import { COLORS, VALIDATION_RULES } from '#/constants'
import { useWalletSubmission } from '#/hooks'
import {
  handleAmountInputChange,
  handleWalletNameInputChange,
} from '#/utils/input'
import { FullScreenModalWrapper } from '#/components/modal-wrappers/FullScreenModalWrapper'
import { CategoriesVisibilityModal } from '#/components/modals/CategoriesVisibilityModal'
import { ColorModal } from '#/components/modals/ColorModal'
import { CurrencyModal } from '#/components/modals/CurrencyModal'
import { HeaderModal } from '#/components/modals/HeaderModal'

// Keeps the logic for a wallet submission
export default function WalletContainer({ formProps, modal, children }) {
  const {
    userData: { categories: userCategories },
    currencies,
  } = useRouteLoaderData('app')

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef,
  } = modal

  const {
    walletData: { name, initialBalance, currency, categories, color },
    updateWalletData,
  } = useWalletSubmission()

  // Memoizing calculations
  const visibleWalletCategories = useMemo(
    () => categories.filter((category) => category.isVisible),
    [categories],
  )
  const areAllCategoriesVisible =
    visibleWalletCategories.length === userCategories.length

  // submitting only the neccessary data and serializing since the data type is more complex
  const stringifiedCategories = useMemo(
    () =>
      JSON.stringify(
        categories.map((category) => ({
          id: category.id,
          isVisible: category.isVisible,
        })),
      ),
    [categories],
  )

  // Keeping all of the data for each field in one big object
  const walletDataConfig = [
    {
      formData: {
        name: 'name',
        value: name,
      },
    },
    {
      formData: {
        name: 'initialBalance',
        value: initialBalance,
      },
      field: {
        name: 'initial balance',
        props: {
          iconName: 'scale',
          type: 'input',
          displayValue: initialBalance,
          controlProps: {
            type: 'number',
            min: VALIDATION_RULES.WALLET.INITIAL_BALANCE.MIN_AMOUNT,
            max: VALIDATION_RULES.WALLET.INITIAL_BALANCE.MAX_AMOUNT,
            step: 0.01,
            onChange: (e) =>
              handleAmountInputChange({
                state: {
                  updateState: updateWalletData,
                  value: initialBalance,
                  prop: 'initialBalance',
                },
                value: e.target.value,
              }),
          },
        },
      },
    },
    {
      formData: {
        name: 'currency',
        value: currency,
      },
      field: {
        name: 'currency',
        props: {
          iconName: 'coins-stacked',
          type: 'select',
          displayValue: currency,
        },
        modal: {
          innerModal: {
            Component: CurrencyModal,
            props: { currencies },
          },
          state: {
            value: currency,
            updateState: (newCurrency) =>
              updateWalletData({ currency: newCurrency }),
          },
        },
      },
    },
    {
      formData: {
        name: 'categories',
        value: stringifiedCategories,
      },
      field: {
        name: 'categories',
        props: {
          iconName: 'categories',
          type: 'select',
          displayValue: areAllCategoriesVisible
            ? 'All'
            : visibleWalletCategories.length,
        },
        modal: {
          innerModal: {
            Component: CategoriesVisibilityModal,
            props: { categories },
          },
          state: {
            value: categories,
            updateState: (newCategories) =>
              updateWalletData({ categories: newCategories }),
          },
          minHeight: 'min-h-[75%]',
        },
      },
    },
    {
      formData: {
        name: 'color',
        value: color,
      },
      field: {
        name: 'color',
        props: {
          iconName: 'paint-roller',
          type: 'select',
          displayValue: (
            <div
              className="size-6 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          ),
        },
        modal: {
          innerModal: {
            Component: ColorModal,
            props: {
              colors: COLORS.ENTITIES.WALLET_COLORS,
              colorBrightness: 'dark',
            },
          },
          state: {
            value: color,
            updateState: (newColorCode) =>
              updateWalletData({ color: newColorCode }),
          },
        },
      },
    },
  ]

  // Using a forEach and standard pushing to a new arr because it's more performant than chaining .filter and .map
  let headerModalFields = []
  walletDataConfig.forEach((option) => {
    if (option.field) headerModalFields.push(option.field)
  })

  return (
    <>
      {children}

      {(isModalOpen || hasTransitioned) && (
        <FullScreenModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          modalRef={modalRef}
          layoutProps={{
            height: 'h-[90dvh]',
            handleOverflow: false, // Overflow is handled in the HeaderModal
          }}
        >
          <HeaderModal
            formProps={{
              fields: walletDataConfig.map((option) => option.formData),
              ...formProps,
            }}
            submitBtn={{
              text: 'add wallet',
              props: {
                value: 'addWallet',
                disabled:
                  formProps.fetcher.state === 'submitting' ||
                  formProps.fetcher.state === 'loading',
              },
            }}
            header={{
              type: 'simple',
              inputProps: {
                value: name,
                minLength: VALIDATION_RULES.WALLET.NAME.MIN_LENGTH,
                maxLength: VALIDATION_RULES.WALLET.NAME.MAX_LENGTH,
                onChange: (e) =>
                  handleWalletNameInputChange({
                    value: e.target.value,
                    updateState: updateWalletData,
                  }),
                className: 'selection:text-gray-light selection:bg-[#3390FF]',
              },
              autoFocus: true,
            }}
            parentModalRef={modalRef}
            fields={headerModalFields}
            color={color}
          />
        </FullScreenModalWrapper>
      )}
    </>
  )
}
