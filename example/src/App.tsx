import React from 'react'

import { useApi, Path, ShowToast } from 'use-api'

export const apiPath: Record<string, Record<string, Path>> = {
  auth: {
    login: ['post', '/auth/login']
  }
}

export type LoginRes = {
  token: string
}

export type LoginReq = {
  email: string
  password: string
}

export const App = () => {
  const loginUser = (data: any) => console.log(data)
  const loginApiConfig = {
    showToast: ShowToast.ON_ERROR,
    onSuccess: loginUser
  }
  const api = useApi<LoginRes, LoginReq>(apiPath.auth.login, loginApiConfig)
  return <>test</>
}
