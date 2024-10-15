import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <h1 className="text-red font-bold">{error.message}</h1>
  )
}