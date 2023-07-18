import type { BasicFetchResult } from '@/api/model/baseModel'

export interface RoleParams {
  name?: string
  permission?: string
  userId?: string
}

export interface RoleListItem {
  id: string
  name: string
  code: string
  category: string | null
  state: boolean | string | null
  remark: string | null
  createTime: string
  updateTime: string | null
}

export interface RoleResourceSaveVO {
  menuIdList: string[]
  roleId: string
}

export interface RoleUserSaveVO {
  flag: boolean
  userIdList: string[]
  roleId: string | number
}

/**
 * @description: Get menu return value
 */
export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>
export type RoleListGetResultModel = RoleListItem[]