import useLazySvgImport from "./useLazySvgImport";

export default function LazySvg({ iconName, ...props }) {
  const { loading, error, Svg } = useLazySvgImport(iconName);

  // To do: use an ExclamationMark default icon and wrap it with a button, opening a modal to signify unsuccessful icon fetch
  if (error) {
    return "An error occurred";
  }

  // To do - implement better loading state
  if (loading) {
    return "Loading...";
  }

  // To do - render a more informative UI
  if (!Svg) {
    return null;
  }

  return <Svg {...props} />;
};
