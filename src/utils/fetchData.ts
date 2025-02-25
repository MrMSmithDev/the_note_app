const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ErrorInterface {
  error: string;
}

if (!API_ENDPOINT) {
  throw new Error('API_ENDPOINT is not defined in environment variables');
}

export async function fetchData<T>(
  route: string,
  options: Partial<RequestInit> = {}
): Promise<any> {
  try {
    const response = await fetch(`${API_ENDPOINT}${route}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const data = (await response.json()) as ErrorInterface;
      return { status: response.status, error: data.error };
    }
    return (await response.json()) as T;
  } catch (err) {
    return { error: err.Message };
  }
}
