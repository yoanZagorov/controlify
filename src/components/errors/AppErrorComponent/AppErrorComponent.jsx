import { useRouteError } from "react-router-dom";

export default function AppErrorComponent() {
  const error = useRouteError();
  console.error(error);
  console.log(error);

  return (
    <div className="page__wrapper flex flex-col gap-4 text-center">
      <p>
        An error ocurred!
      </p>
      <p>
        Error status: {error.status}
      </p>
      <p>
        {error?.data?.message}
      </p>
      <p>
        {error.statusText}
      </p>
      <p>
        {error.data}
      </p>
    </div>
  )
}
