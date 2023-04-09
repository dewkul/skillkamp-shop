import { useEffect, useState } from 'preact/hooks'
import API from '../lib/api'
import { Filter } from '../schema/filter'
import { Product } from '../schema/product'
import { ProductDetail } from '../schema/productDetail'

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
  const [filters, setFilters] = useState<Filter[]>([])
  const { response, loading, error } =
    useGetApi<GetResponseFilter>('/v1/api/filters')

  useEffect(() => {
    if (response) setFilters(response.data.catalog.filters)
  }, [response])

  return {
    filters,
    loading,
    error,
  }
}

export function useGetAllProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)

  const { response, loading, error } =
    useGetApi<GetResponseProducts>('/v1/api/products')

  useEffect(() => {
    if (response) {
      setProducts(
        response.detail.data.catalog.category.productsWithMetaData.list
      )
      setTotalProducts(response.detail.data.catalog.category.numOfProducts)
    }
  }, [response])

  return {
    products,
    totalProducts,
    loading,
    error,
  }
}

export function useGetNewArrivals() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [countNewArrival, setCountNewArrival] = useState(0)

  const { response, loading, error } = useGetApi<GetResponseProducts>(
    '/v1/api/products/new_arrivals'
  )

  useEffect(() => {
    if (response) {
      setNewArrivals(
        response.detail.data.catalog.category.productsWithMetaData.list
      )
      setCountNewArrival(
        response.detail.data.catalog.category.productsWithMetaData.totalCount
      )
    }
  }, [response])

  return {
    newArrivals,
    countNewArrival,
    loading,
    error,
  }
}

export function useGetProductInfo(sku: string) {
  const [productInfo, setProductInfo] = useState<ProductDetail>()

  const { response, loading, error } = useGetApi<GetProductInfoResponse>(
    `/v1/api/products/details/${sku}`
  )

  useEffect(() => {
    if (response && !error) {
      setProductInfo(response.detail.data.catalog.product)
    }
  })

  return {
    productInfo,
    loading,
    error,
  }
}

interface GetResponseFilter {
  data: {
    catalog: {
      filters: Filter[]
    }
  }
}

interface GetResponseProducts {
  detail: {
    data: {
      catalog: {
        category: {
          numOfProducts: number
          productsWithMetaData: {
            totalCount: number
            list: Product[]
          }
        }
      }
    }
  }
}

interface GetProductInfoResponse {
  detail: {
    data: {
      catalog: {
        product: ProductDetail
      }
    }
  }
}
