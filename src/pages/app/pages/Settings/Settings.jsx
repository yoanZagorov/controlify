import { useEffect } from "react";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";

import { resetFetcher } from "@/services/router/utils";
import { walletsColors } from "@/utils/wallet";

import { CategoriesVisibilityModal } from "@/components/modals/CategoriesVisibilityModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useSettings, useWalletUpdate } from "@/hooks";
import { handleFullNameInputChange, handleWalletNameInputChange } from "@/utils/input";
import { capitalize } from "@/utils/str";
import { SvgIcon } from "@/components/SvgIcon";
import { CustomProfilePicType } from "./components/CustomProfilePicType";

export default function Settings() {
  const { isSingleColLayout } = useLayout();

  const fetcher = useFetcher({ key: "updateSettings" });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state])

  const {
    settingsData: {
      profilePic,
      fullName,
      email,
      currency,
      categories,
    },
    updateSettingsData
  } = useSettings();

  const settingsDataConfig = [
    {
      formData: {
        name: "profilePic",
        value: profilePic || ""
      },
      field: {
        name: "profile picture",
        props: {
          iconName: "user-circle",
          type: "custom",
          customType: {
            Component: CustomProfilePicType,
            props: {
              profilePic,
              handleChange: (e) => {
                const file = e.target.files[0];
                if (file) {
                  const previewURL = URL.createObjectURL(file)
                  updateSettingsData({ profilePic: previewURL })
                }
              }
            }
          }
        },
      }
    },
    {
      formData: {
        name: "fullName",
        value: fullName
      },
      field: {
        name: "full name",
        props: {
          iconName: "heading",
          type: "input",
          displayValue: fullName,
          inputProps: {
            value: fullName,
            onChange: (e) => updateSettingsData({ fullName: e.target.value }),
            min: 2,
            max: 50
          }
        },
      }
    },
    {
      formData: {
        name: "email",
        value: email
      },
      field: {
        name: "email",
        props: {
          iconName: "at-sign",
          type: "input",
          displayValue: email,
          inputProps: {
            value: email,
            onChange: (e) => updateSettingsData({ email: e.target.value }),
            min: 2,
            max: 50
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
        name: "main currency",
        props: {
          iconName: "coins-stacked",
          type: "select",
          displayValue: currency,
        },
        modal: {
          type: {
            layout: "fullscreen",
          },
          innerModal: {
            Component: CurrencyModal,
          },
          state: {
            value: currency,
            updateState: (newCurrency) => updateSettingsData({ currency: newCurrency })
          }
        }
      }
    },
    // {
    //   formData: {
    //     name: "categories",
    //     value: categories
    //   },
    //   field: {
    //     name: "categories",
    //     props: {
    //       iconName: "categories",
    //       type: "select",
    //       // displayValue: areAllCategoriesVisible ? "All" : visibleWalletCategories.length,
    //       displayValue: categories.length,
    //     },
    //     modal: {
    //       type: {
    //         layout: "fullscreen",
    //         blocking: true
    //       },
    //       innerModal: {
    //         Component: CategoriesVisibilityModal,
    //         props: { categories },
    //       },
    //       state: {
    //         value: categories,
    //         updateState: (newCategories) => updateWalletData({ categories: newCategories })
    //       },
    //       minHeight: "min-h-[90%]"
    //     }
    //   }
    // },
  ]

  return (
    <SettingsSection
      formProps={{
        fetcher,
        action: "/app/settings",
        btn: {
          props: {
            value: "updateSettings"
          }
        }
      }}
      isSpaceLimited={isSingleColLayout}
      isDeleteBtn={true}
      settings={settingsDataConfig}
      sectionProps={{
        title: "Overall",
        className: "relative"
      }}
    />
  )
}
