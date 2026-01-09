import { useEffect, useMemo } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";

import { resetFetcher } from "#services/router/utils";

import { COLORS, ROUTES, VALIDATION_RULES } from "#constants";

import { useLayout, useScrollToTop, useWalletUpdate } from "#hooks";
import { handleWalletNameInputChange } from "#utils/input";

import { CategoriesVisibilityModal } from "#components/modals/CategoriesVisibilityModal";
import { ColorModal } from "#components/modals/ColorModal";
import { CurrencyModal } from "#components/modals/CurrencyModal";
import { SettingsSection } from "#components/sections/SettingsSection";

// The Settings page for a single wallet
export default function WalletSettings() {
  useScrollToTop();
  const navigate = useNavigate();
  const fetcher = useFetcher({ key: "updateWallet" });

  const { userData: { categories: userCategories }, currencies } = useRouteLoaderData("app");
  const { wallet: { id, deletedAt, isDefault } } = useRouteLoaderData("wallet");

  const { isSingleColLayout } = useLayout();

  // Manual cleanup since there is no modal
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state]);

  // Navigate if the wallet is deleted
  useEffect(() => {
    if (deletedAt) {
      navigate(ROUTES.WALLETS);
    }
  }, [fetcher.data, fetcher.state]);

  const {
    walletData: {
      name,
      currency,
      categories,
      color
    },
    updateWalletData
  } = useWalletUpdate();

  // Memoizing calculations
  const visibleWalletCategories = useMemo(
    () => categories.filter(category => category.isVisible),
    [categories]
  );
  const areAllCategoriesVisible = visibleWalletCategories.length === userCategories.length;

  // submitting only the neccessary and serializing since the data type is more complex
  const stringifiedCategories = useMemo(
    () => JSON.stringify(categories.map(category => ({ id: category.id, isVisible: category.isVisible }))),
    [categories]
  );

  const settingsDataConfig = [
    {
      formData: {
        name: "name",
        value: name
      },
      field: {
        name: "name",
        props: {
          iconName: "heading",
          type: "input",
          displayValue: name,
          controlProps: {
            value: name,
            minLength: VALIDATION_RULES.WALLET.NAME.MIN_LENGTH,
            maxLength: VALIDATION_RULES.WALLET.NAME.MAX_LENGTH,
            onChange: (e) => handleWalletNameInputChange({ value: e.target.value, updateState: updateWalletData }),
          }
        },
      }
    },
    {
      formData: {
        name: "currency",
        value: currency
      },
      field: {
        name: "currency",
        props: {
          iconName: "coins-stacked",
          type: "select",
          displayValue: currency,
        },
        modal: {
          innerModal: {
            Component: CurrencyModal,
            props: { currencies }
          },
          state: {
            value: currency,
            updateState: (newCurrency) => updateWalletData({ currency: newCurrency })
          }
        }
      }
    },
    {
      formData: {
        name: "categories",
        value: stringifiedCategories
      },
      field: {
        name: "categories",
        props: {
          iconName: "categories",
          type: "select",
          displayValue: areAllCategoriesVisible ? "All" : visibleWalletCategories.length,
        },
        modal: {
          innerModal: {
            Component: CategoriesVisibilityModal,
            props: { categories },
          },
          state: {
            value: categories,
            updateState: (newCategories) => updateWalletData({ categories: newCategories })
          },
          height: "h-[90dvh]" // Used to keep the income and expense equal in height
        }
      }
    },
    {
      formData: {
        name: "color",
        value: color
      },
      field: {
        name: "color",
        props: {
          iconName: "paint-roller",
          type: "select",
          displayValue: <div className="size-6 rounded-full" style={{ backgroundColor: color }}></div>,
        },
        modal: {
          innerModal: {
            Component: ColorModal,
            props: { colors: COLORS.ENTITIES.WALLET_COLORS, colorBrightness: "dark" },
          },
          state: {
            value: color,
            updateState: (newColorCode) => updateWalletData({ color: newColorCode })
          }
        }
      }
    },
  ]

  // Improve performance by looping only once
  let fields = [];
  settingsDataConfig.forEach(option => { if (option.field) fields.push(option.field) });

  return (
    <SettingsSection
      entity="wallet"
      formProps={{
        fetcher,
        action: ROUTES.WALLET.DYNAMIC(id),
        btn: {
          props: {
            value: "updateWallet"
          }
        },
        fields: settingsDataConfig.map(option => option.formData)
      }}
      isSpaceLimited={isSingleColLayout}
      deleteEntityFetcher={isDefault ? {} : fetcher}
      fields={fields}
    />
  )
}
