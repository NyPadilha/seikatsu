export type SetupMetas = {
  item: string,
  value: number,
  paid: number,
  bought: boolean,
}

export type FinanceMeta = {
  value: number,
}

export type Metas = {
  meta: string,
  deadline: string,
  achieved: boolean,
}

export type GenericMeta = {
  title: string,
  columns: string[],
  data: string[][],
}