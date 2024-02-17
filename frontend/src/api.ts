interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
}

async function callApi<T>(
  url: string,
  method: string,
  body?: any,
): Promise<ApiResponse<T>> {
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
  return {
    data,
    isLoading: false,
  };
}

export default callApi;
