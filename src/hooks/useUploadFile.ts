import React from 'react'

import useAsync from './useAsync'
import { uploadFile } from '@/services/uploadService'

function useUploadFile() {
  const { runAppend, ...asyncRes } = useAsync()
  const runUploadFile = file => {
    const promiseFile = uploadFile(file)
    runAppend(promiseFile)
    return promiseFile
  }

  React.useEffect(() => {
    if (!asyncRes.error) return
  }, [asyncRes.error])

  return { runUploadFile, ...asyncRes }
}

export default useUploadFile
