import axios from 'axios'

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  withCredentials: false,
})

export const fetchData = async <T>({
  path,
  expectedStatus = 200,
}: DataParams) => {
  try {
    const { data, status } = await API.get(path)
    if (status == expectedStatus) return data as T
    throw new Error(`Fetch status ${status}`)
  } catch (err) {
    throw err
  }
}

export const fetchAuthData = async <T>({
  path,
  token,
  expectedStatus = 200,
}: AuthDataParams) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  try {
    const { data, status } = await API.get(
      path,
      token
        ? {
            headers,
          }
        : undefined
    )
    if (status == expectedStatus) return data as T
    throw new Error(`Fetch auth unexpected status ${status}`)
  } catch (err) {
    throw err
  }
}

export const postData = async <T>({
  path,
  body,
  expectedStatus = 200,
}: DataParamsWithBody) => {
  try {
    const { data, status } = await API.post(path, body)
    if (status == expectedStatus) return data as T
    throw new Error(`POST unexpected status ${status}`)
  } catch (err) {
    throw err
  }
}

export const postAuthData = async ({
  path,
  body,
  token,
}: AuthDataParamsWithBody) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    await API.post(path, body, {
      headers,
    })
  } catch (err) {
    return err as Error
  }
}

export const putAuthData = async ({
  path,
  body,
  token,
}: AuthDataParamsWithBody) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    API.put(path, body, {
      headers,
    })
  } catch (err) {
    return err as Error
  }
}

export const deleteAuthData = async ({
  path,
  body,
  token,
}: AuthDataParamsWithBody) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    await API.delete(path, {
      data: body,
      headers,
    })
  } catch (err) {
    if (err instanceof Error) return err
  }
}

interface DataParams {
  path: string
  expectedStatus?: number
}

interface AuthDataParams extends DataParams {
  token: string
}

interface DataParamsWithBody extends DataParams {
  body?: any
}

interface AuthDataParamsWithBody extends AuthDataParams {
  body?: any
}
