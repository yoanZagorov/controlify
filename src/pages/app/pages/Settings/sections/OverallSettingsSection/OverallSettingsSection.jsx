import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useSettings } from "@/hooks";
import { CustomProfilePicType } from "../../components/CustomProfilePicType";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { useFetcher } from "react-router";
import { useEffect, useRef, useState } from "react";
import uploadProfilePicToCloudinary from "@/services/router/utils/settings/uploadProfilePicToCloudinary";
import { getAuthUserId } from "@/services/firebase/db/user";
import { validateProfilePic } from "@/services/router/utils/settings";
import { resetFetcher } from "@/services/router/utils";
import cn from "classnames";

export default function OverallSettingsSection({ className }) {
  const fetcher = useFetcher({ key: "updateSettings" });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state])

  const { isSingleColLayout } = useLayout();

  const {
    settingsData: {
      profilePic,
      fullName,
      email,
      currency,
    },
    updateSettingsData
  } = useSettings();

  const settingsDataConfig = [
    {
      formData: {
        name: "", // using the native input in CustomProfilePicType
        value: ""
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
                  updateSettingsData({ profilePic: file })
                }
              },
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
            size: "m",
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
        },
        encType: "multipart/form-data"
      }}
      isSpaceLimited={isSingleColLayout}
      settings={settingsDataConfig}
      sectionProps={{
        title: "Overall",
        className: cn("relative", className)
      }}
    />
  )
}