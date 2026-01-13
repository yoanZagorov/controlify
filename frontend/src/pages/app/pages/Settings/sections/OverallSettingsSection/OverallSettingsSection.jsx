import { useFetcher, useRouteLoaderData } from 'react-router'
import { useEffect } from 'react'

import { resetFetcher } from '#/services/router/utils'
import { ROUTES, VALIDATION_RULES } from '#/constants'
import { useLayout, useSettings } from '#/hooks'
import { SettingsSection } from '#/components/sections/SettingsSection'
import { CurrencyModal } from '#/components/modals/CurrencyModal'

import { ProfilePicPreview } from './components/ProfilePicPreview'

// The Settings Section for the Reflect Page
export default function OverallSettingsSection() {
  const { currencies } = useRouteLoaderData('app')

  const fetcher = useFetcher({ key: 'updateSettings' })
  // Manual cleanup since no modal
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      resetFetcher(fetcher)
    }
  }, [fetcher.data, fetcher.state])

  const { isSingleColLayout } = useLayout()

  const {
    settingsData: { profilePic, fullName, email, currency },
    updateSettingsData,
  } = useSettings()

  const settingsDataConfig = [
    {
      formData: {
        name: '', // using the native input in ProfilePicPreview
        value: '',
      },
      field: {
        name: 'profile picture',
        props: {
          iconName: 'user-circle',
          type: 'custom',
          customComponent: {
            Component: ProfilePicPreview,
            props: {
              profilePic,
              handleChange: (e) => {
                const file = e.target.files[0]
                if (file) {
                  updateSettingsData({ profilePic: file })
                }
              },
            },
          },
        },
      },
    },
    {
      formData: {
        name: 'fullName',
        value: fullName,
      },
      field: {
        name: 'full name',
        props: {
          iconName: 'heading',
          type: 'input',
          displayValue: fullName,
          controlProps: {
            value: fullName,
            onChange: (e) => updateSettingsData({ fullName: e.target.value }),
            min: VALIDATION_RULES.FULL_NAME.MIN_LENGTH,
            max: VALIDATION_RULES.FULL_NAME.MAX_LENGTH,
          },
        },
      },
    },
    {
      formData: {
        name: 'email',
        value: email,
      },
      field: {
        name: 'email',
        props: {
          iconName: 'at-sign',
          type: 'input',
          displayValue: email,
          controlProps: {
            size: 'm',
            value: email,
            onChange: (e) => updateSettingsData({ email: e.target.value }),
            min: VALIDATION_RULES.EMAIL.MIN_LENGTH,
            max: VALIDATION_RULES.EMAIL.MAX_LENGTH,
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
        name: 'main currency',
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
              updateSettingsData({ currency: newCurrency }),
          },
        },
      },
    },
  ]

  // Improve performance by looping only one instead of chaining .filter and .map
  let fields = []
  settingsDataConfig.forEach((option) => {
    if (option.field) fields.push(option.field)
  })

  return (
    <SettingsSection
      formProps={{
        fetcher,
        action: ROUTES.SETTINGS,
        btn: {
          props: {
            value: 'updateSettings',
          },
        },
        encType: 'multipart/form-data', // Submitting a file (the profilePic)
        fields: settingsDataConfig.map((option) => option.formData),
      }}
      isSpaceLimited={isSingleColLayout}
      fields={fields}
      sectionProps={{ title: 'Overall' }}
    />
  )
}
