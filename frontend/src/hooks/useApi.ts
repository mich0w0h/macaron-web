import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  callApi: (url: string, method: string, body?: any) => Promise<void>;
}

function useApi<T>(): ApiResponse<T> {
  const [apiResponse, setApiResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    isLoading: false,
    callApi: async () => {},
  });

  const callApi = async (
    url: string,
    method: string,
    body?: any,
  ): Promise<void> => {
    try {
      setApiResponse((prevState) => ({
        ...prevState,
        data: null,
        error: null,
        isLoading: true,
      }));

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${response.statusText}`,
        );
      }

      const data: T = await response.json();
      setApiResponse((prevState) => ({
        ...prevState,
        data,
        error: null,
        isLoading: false,
      }));
    } catch (error: Error | any) {
      setApiResponse((prevState) => ({
        ...prevState,
        data: null,
        error,
        isLoading: false,
      }));
    }
  };

  return { ...apiResponse, callApi };
}

export default useApi;
