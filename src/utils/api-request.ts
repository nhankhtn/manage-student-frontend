import CookieHelper from "./cookie-helper";

export const HOST = process.env.NEXT_PUBLIC_HOST;
export const API_HOST = process.env.NEXT_PUBLIC_HOST + "/api/v1";

export const getFormData = (data: { [name: string]: any }): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(key, v));
    } else if (typeof value != "undefined") {
      formData.append(key, value);
    }
  });
  return formData;
};

const getRequestHeaders = async (
  method: string,
  isFormData?: boolean
): Promise<any> => {
  const token = CookieHelper.getItem("token");

  const headers = new Headers();
  if (token) {
    headers.append("Authorization", "Bearer " + token);
    headers.append("ngrok-skip-browser-warning", "true");
  }

  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }
  headers.append("ngrok-skip-browser-warning", "true"); // Add this line
  return headers;
};

// Parse response date time
const dateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
function reviver(key: any, value: any) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}

// Attach body as search params
const getRequestUrl = (query: string, body?: any) => {
  return (
    (query.startsWith("http") ? "" : API_HOST) +
    query +
    (body ? "?" + new URLSearchParams(body) : "")
  );
};

const apiFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  try {
    const response = await fetch(input, init);
    const result = await response.json();
    if (!response.ok || (response.status !== 200 && response.status !== 201)) {
      const message = `Lỗi: ${
        result.message || result.error.code || response.status
      }`;
      throw new Error(message);
    }
    return result;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export const apiPost = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("POST", isFormData);
  return await apiFetch(getRequestUrl(query), {
    method: "POST",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiDelete = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("DELETE", isFormData);
  return await apiFetch(getRequestUrl(query), {
    method: "DELETE",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiPut = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("PUT", isFormData);
  return await apiFetch(getRequestUrl(query), {
    method: "PUT",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiPatch = async (query: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers = await getRequestHeaders("PATCH", isFormData);
  return await apiFetch(getRequestUrl(query), {
    method: "PATCH",
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const apiGet = async (query: string, body?: any) => {
  const headers = await getRequestHeaders("GET");
  return await apiFetch(getRequestUrl(query, body), {
    method: "GET",
    headers,
  });
};
