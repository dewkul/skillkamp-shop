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
