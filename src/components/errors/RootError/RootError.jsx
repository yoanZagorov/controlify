import { useRouteError } from "react-router-dom";

export default function RootError() {
  const error = useRouteError();

  return (
    <div className="text-center">
      <p>
        An error ocurred!
      </p>
      <p>
        Error status: {error.status}
      </p>
      <p>
        {error.data.message}
      </p>
    </div>
  )
}
