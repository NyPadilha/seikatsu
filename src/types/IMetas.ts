export type SetupMetas = {
  item: string,
  value: number,
  paid: number,
  bought: boolean,
}

export type FinanceMeta = {
  value: number,
  emergency_fund: number,
}

export type MetasType = {
  meta: string,
  deadline: string,
  achieved: boolean,
}

export type ColumnType = "string" | "number" | "checkbox" | "money";

export type Column = {
  name: string,
  c_type: ColumnType,
}

export type GenericMeta = {
  title: string,
  columns: Column[],
  data: string[][],
}