import { useEffect, useState } from 'preact/hooks'
import API from '../lib/api'
import { Filter } from '../schema/filter'

function useGetApi<T>(path: string) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<T>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(path)
        setResponse(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {
    response,
    loading,
  }
}

export function useGetFilterApi() {
  const [filters, setFilters] = useState<Filter[]>()
  const { response, loading } = useGetApi<GetResponseFilter>('/v1/filters')

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
