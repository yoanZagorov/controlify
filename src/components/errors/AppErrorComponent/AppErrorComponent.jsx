import { useRouteError } from "react-router-dom";

export default function AppErrorComponent() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1>
        An error ocurred!
      </h1>
      <p>
        Error status: {error.status}
      </p>
      <p>
        {error?.data?.msg}
      </p>
      <p>
        {error.statusText}
      </p>
    </div>
  )
}
