import request from '@/api/request'
import { PreScanningConfigProps } from '@/types/preScanning'



function getPreScanningRule({ token }: { token: string }) {
  return request(
    {
      url: '/v1.0.0/rules',
      method: 'GET',
    },
    token,
  )
}

function configPreScanning({ token, data }: { token: string, data: PreScanningConfigProps }) {
  return request(
    {
      url: '/v1.0.0/rules',
      method: 'POST',
      data,
    },
    token,
  )
}

export { getPreScanningRule, configPreScanning }
