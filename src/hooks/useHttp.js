import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

function useHttp(requestFunction, applyDataToRedux) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const sendRequest = useCallback(
        async function (requestData, id) {
            setIsLoading(true);
            try {
                const responseData = await requestFunction(requestData, id);
                applyDataToRedux && dispatch(applyDataToRedux(responseData));
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        },
        [requestFunction, dispatch, applyDataToRedux]
    );
    return {
        sendRequest,
        isLoading,
        error,
    };
}

export default useHttp;
