
const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

type ApiRequestOptions = RequestInit & {
  token?: string | null;
  suppressErrorLog?: boolean;
  skipUnauthorizedRetry?: boolean;
};

type FastApiValidationError = {
  msg?: string;
};

type ApiErrorResponse = {
  detail?: string | FastApiValidationError[];
  message?: string;
};

let unauthorizedRetryHandler:
  | (() => Promise<string | null>)
  | null = null;

export function setUnauthorizedRetryHandler(
  handler: (() => Promise<string | null>) | null
) {
  unauthorizedRetryHandler = handler;
}

export class ApiRequestError extends Error {
  status: number;
  responseData: unknown;

  constructor(
    message: string,
    status: number,
    responseData: unknown
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.responseData = responseData;
  }
}

export function buildApiUrl(endpoint: string) {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured in .env.local"
    );
  }

  const normalizedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  if (
    API_URL.endsWith("/api") &&
    normalizedEndpoint.startsWith("/api/")
  ) {
    return `${API_URL}${normalizedEndpoint.replace(
      /^\/api/,
      ""
    )}`;
  }

  return `${API_URL}${normalizedEndpoint}`;
}

function getErrorMessage(data: unknown): string {
  if (
    typeof data !== "object" ||
    data === null
  ) {
    return "API request failed";
  }

  const errorData = data as ApiErrorResponse;

  if (typeof errorData.detail === "string") {
    return errorData.detail;
  }

  if (Array.isArray(errorData.detail)) {
    return errorData.detail
      .map((error) => {
        return error.msg ?? "Validation error";
      })
      .join(", ");
  }

  if (typeof errorData.message === "string") {
    return errorData.message;
  }

  return "API request failed";
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured in .env.local"
    );
  }

  const requestUrl = buildApiUrl(endpoint);

  /*
   * token ko alag kar diya,
   * kyunki fetch() token property ko nahi jaanta.
   */
  const {
    token,
    suppressErrorLog,
    skipUnauthorizedRetry,
    ...requestOptions
  } = options;

  const buildHeaders = (authToken?: string | null) => {
    const headers = new Headers(
      requestOptions.headers
    );

    headers.set("Accept", "application/json");

    const isFormData =
      typeof FormData !== "undefined" &&
      requestOptions.body instanceof FormData;

    if (
      requestOptions.body &&
      !isFormData &&
      !headers.has("Content-Type")
    ) {
      headers.set(
        "Content-Type",
        "application/json"
      );
    }

    if (authToken) {
      headers.set(
        "Authorization",
        `Bearer ${authToken}`
      );
    }

    return headers;
  };

  let response: Response;

  try {
    response = await fetch(requestUrl, {
      ...requestOptions,
      headers: buildHeaders(token),
    });
  } catch (error) {
    console.error("API network error:", {
      requestUrl,
      error,
    });

    throw new Error(
      "Could not connect to the backend. Check the FastAPI server, API URL, and CORS settings."
    );
  }

  /*
   * DELETE API agar 204 No Content return kare.
   */
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType =
    response.headers.get("content-type") ?? "";

  let responseData: unknown;

  if (
    contentType.includes("application/json")
  ) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    if (
      response.status === 401 &&
      token &&
      !skipUnauthorizedRetry &&
      unauthorizedRetryHandler
    ) {
      const refreshedToken =
        await unauthorizedRetryHandler();

      if (refreshedToken) {
        return apiRequest<T>(endpoint, {
          ...options,
          token: refreshedToken,
          skipUnauthorizedRetry: true,
        });
      }
    }

    if (!suppressErrorLog) {
      console.error("API request failed:", {
        requestUrl,
        status: response.status,
        responseData,
      });
    }

    throw new ApiRequestError(
      getErrorMessage(responseData),
      response.status,
      responseData
    );
  }

  return responseData as T;
}
