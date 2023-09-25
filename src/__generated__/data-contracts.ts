/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** UserQueryBO */
export interface UserQueryBO {
  /** 模糊搜索关键词 */
  keyWords?: string;
  /**
   * 每页展示条数
   * @format int32
   */
  limit?: number;
  /**
   * 当前页数
   * @format int32
   */
  page?: number;
  /**
   * 是否分页，0:不分页 1 分页
   * @format int32
   */
  pageType?: 0 | 1;
  /** 员工编号，唯一 */
  userCode?: string;
  /** 用户名 */
  userName?: string;
}

/** UserVO */
export interface UserVO {
  /** @format date-time */
  createTime?: Date;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 员工编号，唯一
   * @format int32
   */
  modelIndex?: number;
  usercode?: string;
  /** 用户名 */
  username?: string;
}

/** BasePageOfUser对象 */
export interface BasePageOfUser {
  extraData?: object;
  firstPage?: boolean;
  lastPage?: boolean;
  list?: User[];
  /** @format int64 */
  pageNumber?: number;
  /** @format int64 */
  pageSize?: number;
  /** @format int64 */
  totalPage?: number;
  /** @format int64 */
  totalRow?: number;
}

/** User对象 */
export interface User {
  /** @format date-time */
  createTime?: Date;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 员工编号，唯一
   * @format int32
   */
  modelIndex?: number;
  usercode?: string;
  /** 用户名 */
  username?: string;
}

/** 返回结构OfBasePageOfUser对象 */
export interface OfBasePageOfUser {
  /** 业务数据结构 */
  data?: BasePageOfUser;
  /** 日志id */
  exceptionId?: string;
  fail?: boolean;
  /** 附加信息 */
  message?: string;
  /** 返回编码 */
  retCode?: string;
  success?: boolean;
}

/** 返回结构Ofobject */
export interface Ofobject {
  /** 业务数据结构 */
  data?: object;
  /** 日志id */
  exceptionId?: string;
  fail?: boolean;
  /** 附加信息 */
  message?: string;
  /** 返回编码 */
  retCode?: string;
  success?: boolean;
}
