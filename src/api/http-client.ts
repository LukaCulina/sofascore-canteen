import { useAuthStore } from "@/stores/auth"
export const API_BASE_URL = "https://frontend-academy.sofascore-api.deno.net/api"

type JsonRequestMethod = "POST" | "PUT" | "DELETE"

const getUrl = (path: string) => `${API_BASE_URL}${path}`

const dbTargetHeader = {
  "x-target-db": "pbsrb",
}

const getAuthHeaders = (): HeadersInit => {
  const token = useAuthStore.getState().token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const requestJson = <T>(
  method: JsonRequestMethod,
  url: string,
  body?: unknown,
  options: RequestInit = {},
): Promise<T> => {
  const { headers, ...fetchOptions } = options

  const reqHeaders: HeadersInit = {
    ...getAuthHeaders(),
    ...(method === "POST" || method === "PUT" ? { "Content-Type": "application/json" } : {}),
  }

  return fetch(getUrl(url), {
    method,
    ...fetchOptions,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    headers: { ...dbTargetHeader, ...headers, ...reqHeaders },
  }).then((rawResponse) => parseResponse<T>(rawResponse))
}

/**
 * Send GET request to given URL, with provided `options`.
 */
export function getJson<T>(url: string, { ...options }: RequestInit = {}): Promise<T> {
  return fetch(getUrl(url), {
    ...options,
    headers: {
      ...dbTargetHeader,
      ...getAuthHeaders(),
      ...options.headers,
    },
  }).then((response: Response) => parseResponse<T>(response))
}

/**
 * @deprecated Use `requestJson("POST", url, body, options)` instead.
 * Send POST request to given URL, with provided body and options.
 */
export const postJson = <T>(url: string, body = {}, options: RequestInit = {}): Promise<T> => {
  const { headers, ...fetchOptions } = options

  const reqHeaders = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  }

  return fetch(getUrl(url), {
    method: "POST",
    ...fetchOptions,
    body: JSON.stringify(body),
    headers: { ...dbTargetHeader, ...headers, ...reqHeaders },
  }).then((rawResponse) => parseResponse<T>(rawResponse))
}

export function parseResponse<T>(response: Response): Promise<T> {
  return new Promise((resolve, reject) => {
    const emptyResponse = {} as T
    try {
      if (response.status === 204) {
        resolve(emptyResponse)
        return
      }

      const isHTTPSuccessStatus = response.status >= 200 && response.status < 400
      const responseData = response.json()

      if (isHTTPSuccessStatus) {
        resolve(responseData)
      } else {
        reject(responseData)
      }
    } catch (error) {
      reject(error)
    }
  })
}
