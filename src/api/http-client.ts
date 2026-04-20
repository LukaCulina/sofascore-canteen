import { useAuthStore } from "@/stores/auth"
export const API_BASE_URL = "https://frontend-academy.sofascore-api.deno.net/api"

const getUrl = (path: string) => `${API_BASE_URL}${path}`

const dbTargetHeader = {
  "x-target-db": "pbsrb",
}

const getAuthHeaders = (): HeadersInit => {
  const token = useAuthStore.getState().token
  return token ? { Authorization: `Bearer ${token}` } : {}
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

/**
 * Send PUT request to given URL, with provided body and options.
 */
export const putJson = <T>(url: string, body = {}, options: RequestInit = {}): Promise<T> => {
  const token = useAuthStore.getState().token
  const { headers, ...fetchOptions } = options

  const reqHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  return fetch(getUrl(url), {
    method: "PUT",
    ...fetchOptions,
    body: JSON.stringify(body),
    headers: { ...dbTargetHeader, ...headers, ...reqHeaders },
  }).then((rawResponse) => parseResponse<T>(rawResponse))
}

/**
 * Send DELETE request to given URL, with provided options.
 */
export const deleteJson = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = useAuthStore.getState().token
  const { headers, ...fetchOptions } = options

  const reqHeaders = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  return fetch(getUrl(url), {
    method: "DELETE",
    ...fetchOptions,
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
