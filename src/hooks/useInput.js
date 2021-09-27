import { useState } from "react";

const useInput = (validateValue, extraData = null) => {
    const [value, setValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(value, extraData);
    const hasError = !isValid && isTouched;

    const inputChangeHandler = (e) => {
        setValue(e.target.value);
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setValue("");
        setIsTouched(false);
    };

    return {
        value,
        isValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
