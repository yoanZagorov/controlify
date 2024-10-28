import useLazySvgImport from "./useLazySvgImport";

export default function LazySvg({ iconName, ...props }) {
  const { loading, error, Svg } = useLazySvgImport(iconName);

  if (error) {
    return "An error occurred";
  }

  // To do - implement better loading state
  if (loading) {
    return "Loading...";
  }

  if (!Svg) {
    return null;
  }

  return <Svg {...props} />;
};
