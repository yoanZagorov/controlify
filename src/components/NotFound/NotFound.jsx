import logo from "logos/logoGrayBg.png";
import { Widget } from "../widgets/Widget";
import { Button } from "../Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen mx-auto flex flex-col justify-center gap-12 p-4 text-center">
      <div>
        <img src={logo} />
        <p className="text-lg fhd:text-xl text-gray-dark">Take control of your finances</p>
      </div>

      <Widget className="max-w-80 mx-auto">
        <h1 className="text-red-dark text-3xl font-medium">404 Error - Page Not Found!</h1>
        <p className="mt-8 text-lg text-gray-dark font-medium">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL could be incorrect.
        </p>
        <Button size="l" className="mt-8">
          <Link to="/">BACK TO HOME PAGE</Link>
        </Button>
      </Widget>
    </main>
  )
}
