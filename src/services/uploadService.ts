import request from '@/api/request'

export async function uploadFile({ token, file }) {
  const formData = new FormData()
  formData.append('file', file)

  const resp = await request(
    {
      url: '/v1.0.0/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    },
    token,
  )
  return resp?.fileUrl
}
