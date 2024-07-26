import { useCallback, useState } from "react";

const useBoolean = () => {
  const [value, setValue] = useState(false);

  const handleOn = useCallback(() => {
    setValue(true);
  }, []);

  const handleOff = useCallback(() => {
    setValue(false);
  }, []);

  const handleToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return { value, handleOn, handleOff, handleToggle };
};

export default useBoolean;
