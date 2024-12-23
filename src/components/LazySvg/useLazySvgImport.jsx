import { useEffect, useRef, useState } from "react";

export default function useLazySvgImport(iconName) {
  const importRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function importIcon() {
      try {
        importRef.current = (await import(`@/assets/icons/${iconName}.svg?react`)).default;
      } catch (error) {
        console.error(`Unable to dynamically import ${iconName} icon`);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    importIcon();
  }, [iconName]);

  return {
    error,
    loading,
    Svg: importRef.current,
  };
};