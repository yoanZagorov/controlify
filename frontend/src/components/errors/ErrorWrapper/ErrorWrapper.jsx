import { Link } from "react-router";
import { Widget } from "@/components/widgets/Widget";
import { Button } from "@/components/Button";
import { ROUTES } from "@/constants";
import { FullLogo } from "@/assets/logos/FullLogo";

export default function ErrorWrapper({ error }) {
  const errorConfig = {
    title: "Oops! An unexpected error occured!",
    msg: "Please try returning to the home page",
    ...error
  }

  const { title, msg } = errorConfig;

  return (
    <main className="h-screen mx-auto w-full max-w-[500px] flex flex-col justify-center gap-10 p-4 text-center">
      <div>
        <FullLogo />
        <p className="mt-1.5 ml:text-lg text-gray-dark">Take control of your finances</p>
      </div>

      <Widget className="mx-auto max-w-96">
        <h1 className="text-red-dark text-2xl ml:text-3xl font-medium">{title}</h1>
        <p className="mt-4 ml:mt-8 ml:text-lg text-gray-dark font-medium">
          {msg}
        </p>
        <Button size="l" className="mt-6 ml:mt-10">
          <Link to={ROUTES.INDEX}>BACK TO HOME PAGE</Link>
        </Button>
      </Widget>
    </main>
  )
}
