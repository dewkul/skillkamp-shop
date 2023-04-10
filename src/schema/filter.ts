export interface Filter {
  filterType: string
  name: string
  field: string
  values: FilterValue[]
}

export interface FilterValue {
  key: string
  value: string
}

export interface FilterQueryParams {
  cat?: string
  f?: string
  t?: string
  c?: string
  s?: string
}
