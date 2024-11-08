import { useRouteError } from "react-router-dom";

export default function AppErrorComponent() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center">
      <p>
        An error ocurred!
      </p>
      <p>
        Error status: {error.status}
      </p>
      <p>
        {error?.data?.message}
      </p>
    </div>
  )
}
