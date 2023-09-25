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

import { OfBasePageOfUser, Ofobject, User, UserQueryBO, UserVO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 用户管理相关接口
   * @name GetUserByIdUsingPost1
   * @summary 获取用户详情feign
   * @request POST:/api/auth-server/user/getUserById
   * @secure
   * @response `200` `UserVO` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  getUserByIdUsingPost1 = (
    query: {
      /**
       * userId
       * @format int64
       */
      userId: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<UserVO, void>({
      path: `/api/auth-server/user/getUserById`,
      method: "POST",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags 登录管理相关接口
   * @name GetUserInfoUsingGet
   * @summary 获取用户信息
   * @request GET:/api/auth-server/user/getUserInfo
   * @secure
   * @response `200` `Ofobject` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  getUserInfoUsingGet = (params: RequestParams = {}) =>
    this.http.request<Ofobject, void>({
      path: `/api/auth-server/user/getUserInfo`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 登录管理相关接口
   * @name LoginUsingPost
   * @summary 用户登录
   * @request POST:/api/auth-server/user/login
   * @secure
   * @response `200` `Ofobject` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  loginUsingPost = (
    query?: {
      /** token */
      token?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<Ofobject, void>({
      path: `/api/auth-server/user/login`,
      method: "POST",
      query: query,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 登录管理相关接口
   * @name LogoutUsingPost
   * @summary 用户退出
   * @request POST:/api/auth-server/user/logout
   * @secure
   * @response `200` `Ofobject` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  logoutUsingPost = (params: RequestParams = {}) =>
    this.http.request<Ofobject, void>({
      path: `/api/auth-server/user/logout`,
      method: "POST",
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户管理相关接口
   * @name QueryUserPageUsingPost
   * @summary 分页查询
   * @request POST:/api/auth-server/user/query
   * @secure
   * @response `200` `OfBasePageOfUser` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  queryUserPageUsingPost = (userQueryBO: UserQueryBO, params: RequestParams = {}) =>
    this.http.request<OfBasePageOfUser, void>({
      path: `/api/auth-server/user/query`,
      method: "POST",
      body: userQueryBO,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户管理相关接口
   * @name GetUserByIdUsingPost
   * @summary 切换视图模板
   * @request POST:/api/auth-server/user/swichmodel
   * @secure
   * @response `200` `User` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  getUserByIdUsingPost = (
    query: {
      /**
       * index
       * @format int32
       */
      index: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<User, void>({
      path: `/api/auth-server/user/swichmodel`,
      method: "POST",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags 登录管理相关接口
   * @name TestUsingPost
   * @summary 模拟登录token
   * @request POST:/api/auth-server/user/test
   * @secure
   * @response `200` `Ofobject` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  testUsingPost = (
    query?: {
      /** code */
      code?: string;
      /** first */
      first?: boolean;
      /** fourth */
      fourth?: boolean;
      /** name */
      name?: string;
      /** second */
      second?: boolean;
      /** third */
      third?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<Ofobject, void>({
      path: `/api/auth-server/user/test`,
      method: "POST",
      query: query,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户管理相关接口
   * @name GetUserUsingPost
   * @summary 获取用户详情
   * @request POST:/api/auth-server/user/userInfo
   * @secure
   * @response `200` `Ofobject` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  getUserUsingPost = (
    query?: {
      /**
       * 用户id
       * @format int64
       */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<Ofobject, void>({
      path: `/api/auth-server/user/userInfo`,
      method: "POST",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
