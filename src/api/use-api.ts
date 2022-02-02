import axios from 'axios'
import { useState } from 'react'
import { differenceInMilliseconds } from 'date-fns'
import { API_URL } from './api.constants'
import { Path, ApiConfig, UseApiType, Call } from './api.types'
import { handleToast } from './api.utils'

export const useApi = <Res, Req = {}>(
  [method, path]: Path,
  apiConfig: ApiConfig<Res, Req> = {}
): UseApiType => {
  let start: Date
  const [loading, setLoading] = useState(false)

  const showToastOn = handleToast(apiConfig?.showToast)
  const successAction = (reqData: any, args: any[]) => (resData: any) => {
    console.log(resData, apiConfig?.onSuccess)
    apiConfig?.onSuccess?.({ resData, reqData, args })
    setLoading(false)
    // navigateTo(apiConfig?.navigateTo)
    showToastOn('success')
  }

  const errorAction = (e: any) => {
    apiConfig?.onError?.()
    setLoading(false)
    handleError(e?.response?.data)
  }

  const handleError = (error: any) => {
    showToastOn('error', error?.message)
    console.log('api call error ', error)
  }

  const waitIfNeeded =
    <T>(action: (data: T) => void) =>
    (data: T) => {
      const now = new Date()
      const duration = start ? differenceInMilliseconds(now, start) : 0
      const restTime = Math.max(0, 500 - duration)
      if (restTime) {
        setTimeout(() => {
          action(data)
        }, restTime)
      } else {
        action(data)
      }
    }

  const call = async ({ data, args }: Call = {}) => {
    setLoading(true)
    start = new Date()
    const transformReq = apiConfig?.transform
    console.log('call api data', data)
    data = transformReq?.(data) ?? data
    path = typeof path === 'function' ? path?.(...(args ?? [])) : path
    await axios[method]<Res>(API_URL + path, data)
      .then((res: any) => res.data)
      .then(waitIfNeeded<Res>(successAction(data, args ?? [])))
      .catch(waitIfNeeded(errorAction))
  }

  return [call, loading]
}
