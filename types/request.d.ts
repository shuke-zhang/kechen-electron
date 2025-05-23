/**
 * @description 基础数据类型
 */
declare type ResponseResult<T extends object = object> = { code: number, msg: string } & T
/**
 * @description 分页列表数据  返回的是 rows 和 total 如果是其他格式请自定义
 *              注意！ rows 已经 是个 T[] 类型！
 */
declare interface ResponseList<T> {
  total: number
  rows: T[]
}


/**
 * @description 数据类型 包含在 data 里面
 */
declare interface ResponseData<T> {
  data: T
}

/**
 * @description 基础分页参数 pageNum pageSize
 */
declare interface ListParamsBase {
  pageNum: number
  pageSize: number
  /**
   * @description 排序字段 需要和后端约定好
   */
  orderByColumn?: string
  /**
   * @description 排序方式  默认 asc
   * @default asc
   * @example asc - 升序
   * @example desc - 降序
   */
  isAsc?: string
}
/**
 * @description 基础分页参数查询
 */
declare type ListParamsWrapper<T extends object = object> = Partial<ListParamsBase & T>


declare type listParams<T extends object = object> = ListParamsWrapper<T>

/**
 * @description 分页查询参数 不包含 pageNum pageSize
 */
declare type ListAllParams<T extends object = object> = Omit<
  ListParamsWrapper<T>,
  'pageNum' | 'pageSize'
>
