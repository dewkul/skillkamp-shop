import { useEffect, useState } from 'preact/hooks'
import API from '../lib/api'
import { Filter } from '../schema/filter'

function useGetApi<T>(path: string) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<T>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(path)
        setResponse(data)
      } catch (err) {
        if (err instanceof Error) setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {
    response,
    loading,
    error,
  }
}

export function usePostApi<T>(path: string, reqBody?: any) {
  const [response, setResponse] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const postData = async () => {
      try {
        const { data } = await API.post(path, reqBody)
        setResponse(data)
      } catch (err) {
        if (err instanceof Error) setError(err)
      } finally {
        setLoading(false)
      }
    }
    postData()
  }, [])

  return {
    response,
    loading,
    error,
  }
}

export function useGetFilterApi() {
  const [filters, setFilters] = useState<Filter[]>()
  const { response, loading } = useGetApi<GetResponseFilter>('/v1/api/filters')

  useEffect(() => {
    if (response) setFilters(response.data.catalog.filters)
  }, [response])

  return {
    filters,
    loading,
  }
}

interface GetResponseFilter {
  data: FilterResponseData
}

interface FilterResponseData {
  catalog: FilterResponseCatalog
}

interface FilterResponseCatalog {
  filters: Filter[]
}
