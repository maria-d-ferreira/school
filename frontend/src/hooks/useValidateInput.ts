import { useState } from "react";

const useValidateInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    setEnteredValue(event.target.value);
  };

  const reset = (): void => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    reset,
  };
};

export default useValidateInput;
