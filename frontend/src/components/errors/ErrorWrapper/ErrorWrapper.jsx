import { Link } from 'react-router'

import { ROUTES } from '#/constants'

import { FullLogo } from '#/assets/logos/FullLogo'

import { Widget } from '#/components/widgets/Widget'
import { Button } from '#/components/Button'

export default function ErrorWrapper({ error }) {
  const errorConfig = {
    title: 'Oops! An unexpected error occured!',
    msg: 'Please try returning to the home page',
    ...error,
  }

  const { title, msg } = errorConfig

  return (
    <main className="mx-auto flex h-screen w-full max-w-[500px] flex-col justify-center gap-10 p-4 text-center">
      <div>
        <FullLogo />
        <p className="mt-1.5 text-gray-dark ml:text-lg">
          Take control of your finances
        </p>
      </div>

      <Widget className="mx-auto max-w-96">
        <h1 className="text-2xl font-medium text-red-dark ml:text-3xl">
          {title}
        </h1>
        <p className="mt-4 font-medium text-gray-dark ml:mt-8 ml:text-lg">
          {msg}
        </p>
        <Button size="l" className="mt-6 ml:mt-10">
          <Link to={ROUTES.INDEX}>back to home page</Link>
        </Button>
      </Widget>
    </main>
  )
}
