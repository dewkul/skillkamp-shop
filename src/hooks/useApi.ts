import { StateUpdater, useEffect, useState } from 'preact/hooks'
import API from '../lib/api'
import { Filter, FilterQueryParams } from '../schema/filter'
import { Product } from '../schema/product'
import { ProductDetail } from '../schema/productDetail'
import { CartItem } from '../schema/cart'
import { useAuthCtx } from './useAuth'

export const fetchData = async <T>({
  path,
  setError,
  setLoading,
}: DataParams) => {
  try {
    const { data } = await API.get(path)
    return data as T
  } catch (err) {
    if (err instanceof Error) setError(err)
  } finally {
    setLoading(false)
  }
}

export const fetchAuthData = async <T>({
  path,
  setError,
  setLoading,
  token,
}: AuthDataParams) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  try {
    const { data } = await API.get(
      path,
      token
        ? {
            headers,
          }
        : undefined
    )
    return data as T
  } catch (err) {
    if (err instanceof Error) setError(err)
  } finally {
    setLoading(false)
  }
}

export const postData = async <T>({
  path,
  body,
  setError,
  setLoading,
}: DataParamsWithBody) => {
  try {
    const { data } = await API.post(path, body)
    return data as T
  } catch (err) {
    if (err instanceof Error) setError(err)
  } finally {
    setLoading(false)
  }
}

export const postAuthData = async ({
  path,
  body,
  token,
}: AuthDataParamsWithBody) => {
  if (!token) return
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    await API.post(
      path,
      body,
      token
        ? {
            headers,
          }
        : undefined
    )
  } catch (err) {
    if (err instanceof Error) return err
  }
}

export const putAuthData = async <T>({
  path,
  body,
  token,
}: AuthDataParamsWithBody) => {
  if (!token) return
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    API.put(
      path,
      body,
      token
        ? {
            headers,
          }
        : undefined
    )
  } catch (err) {
    if (err instanceof Error) return err
  }
}

export const deleteAuthData = async <T>({
  path,
  body,
  token,
}: AuthDataParamsWithBody) => {
  if (!token) return
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

// export const putData = async <T>({
//   path,
//   body,
//   token,
//   setError,
//   setLoading,
// }: AuthDataParamsWithBody<T>) => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   }
//   try {
//     const { data } = await API.post(
//       path,
//       body,
//       token
//         ? {
//             headers,
//           }
//         : undefined
//     )
//     return data as T
//   } catch (err) {
//     if (err instanceof Error) setError(err)
//   } finally {
//     setLoading(false)
//   }
// }

// export const deleteData = async <T>({
//   path,
//   body,
//   token,
//   setError,
//   setLoading,
// }: AuthDataParamsWithBody<T>) => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   }
//   try {
//     const { data } = await API.post(
//       path,
//       body,
//       token
//         ? {
//             headers,
//           }
//         : undefined
//     )
//     return data as T
//   } catch (err) {
//     if (err instanceof Error) setError(err)
//   } finally {
//     setLoading(false)
//   }
// }

function useGetApi<T>(path: string) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<T>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetchData<T>({
      path,
      setLoading,
      setError,
    }).then((response) => setResponse(response))
  }, [])

  return {
    response,
    loading,
    error,
  }
}

function useGetAuthApi<T>(path: string) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<T>()
  const [error, setError] = useState<Error>()

  const { token } = useAuthCtx()

  useEffect(() => {
    if (token.value)
      fetchAuthData<T>({
        path,
        token: token.value,
        setLoading,
        setError,
      }).then((response) => setResponse(response))
  }, [])

  return {
    response,
    loading,
    error,
  }
}

// export function usePostApi<T>(path: string, reqBody?: any) {
//   const [response, setResponse] = useState<T>()
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error>()

//   useEffect(() => {
//     const postData = async () => {
//       try {
//         const { data } = await API.post(path, reqBody)
//         setResponse(data)
//       } catch (err) {
//         if (err instanceof Error) setError(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     postData()
//   }, [])

//   return {
//     response,
//     loading,
//     error,
//   }
// }

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

export const getProductInfoBySku = async (sku: string) => {
  const { data, status } = await API.get(`/v1/api/products/details/${sku}`)
  if (status != 200)
    throw new Error(`Fail to get product info with status: ${status} - ${data}`)
  return (data as GetProductInfoResponse).detail.data.catalog.product
}

export const queryProductByFilters = async ({
  cat,
  s,
  c,
  f,
  t,
}: FilterQueryParams) => {
  const params: string[] = []
  if (cat) {
    params.push(`CATEGORY=${cat}`)
  }
  if (s) {
    params.push(`OPTION_LIST=${s}`)
  }
  if (c) {
    params.push(`OPTION_COLOR=${c}`)
  }
  if (f && t) {
    params.push(`PRICE=${f}-${t}`)
  }
  const { data, status } = await API.get(`/v1/api/products?${params.join('&')}`)

  if (status != 200)
    throw new Error(`Fail to query products with status: ${status} - ${data}`)
  return (data as GetResponseProducts).detail.data.catalog.category
    .productsWithMetaData.list
}

export function useGetItemsInCart() {
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)

  const { response, loading, error } =
    useGetAuthApi<GetItemsInCartResponse>('/v1/api/cart')

  useEffect(() => {
    if (response) {
      setItemsInCart(response.detail.cart_list)
      setTotalCost(response.detail.total)
      setSubtotal(response.detail.sub_total)
      setShippingCost(response.detail.shipping)
    }
  }, [response])

  return {
    itemsInCart,
    totalCost,
    subtotal,
    shippingCost,
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

interface GetItemsInCartResponse {
  detail: {
    total: number
    shipping: number
    sub_total: number
    cart_list: CartItem[]
  }
}

interface DataParams {
  path: string
  setError: StateUpdater<Error | undefined>
  setLoading: StateUpdater<boolean>
}

interface AuthDataParams extends DataParams {
  token: string
}

interface DataParamsWithBody extends DataParams {
  body?: any
}

interface AuthDataParamsWithBody {
  path: string
  token?: string
  body?: any
}
