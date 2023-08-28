import React, { useState } from 'react'
import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Input, message, Upload } from 'antd'
import { useAuth } from '@/contexts/authContext'
import { uploadFile } from '@/services/uploadService'

function ImageCard({ url, onDelete }) {
  const [status, setStatus] = useState('idle')

  const isLoaded = status === 'success'

  function handleImageOnLoad() {
    setStatus('success')
  }

  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {isLoaded ? (
          <Button
            size="small"
            danger
            type="primary"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={onDelete}
            style={{ position: 'absolute', right: '-8px', top: '-10px' }}
          />
        ) : null}
      </div>
      <img
        onLoad={handleImageOnLoad}
        src={url}
        alt="preview-file"
        css={css`
          max-width: 400px;
          height: auto;
          border: 1px solid #cecece;
        `}
      />
    </div>
  )
}

// TODO: add extra props for custom
export default function InlineUpload({
  value,
  onChange,
}: {
  value?: any
  onChange?: any
}) {
  const { accessToken } = useAuth()
  const [preview, setPreview] = useState(value || '')
  const [status, setStatus] = useState('idle')
  const handleChange = async info => {
    const fileUpload = info.file

    setStatus('loading')

    try {
      const urlDownload = await uploadFile({
        token: accessToken,
        file: fileUpload,
      })
      setPreview(urlDownload)
      onChange(urlDownload)
      setStatus('success')
    } catch (err: any) {
      message.error(err.message || 'Upload file không thành công')
      setStatus('error')
    }
  }

  const isUploading = status === 'loading'

  const removeImage = () => {
    setPreview('')
    onChange('')
  }

  const beforeUpload = file => {
    const validFileType = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png']
    const isValidFileType = validFileType.includes(file.type)
    if (!isValidFileType) {
      message.error('Tệp tin không đúng định dạng')
      return Upload.LIST_IGNORE
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Dung lượng ảnh phải nhỏ hơn 2MB')
      return Upload.LIST_IGNORE
    }

    return false
  }

  return (
    <>
      <div>
        <div
          css={css`
            display: flex;
            margin-bottom: 5px;
          `}
        >
          <Upload
            accept={'.JPG, .JPEG, .GIF, .PNG'}
            onChange={handleChange}
            multiple={false}
            showUploadList={false}
            beforeUpload={beforeUpload}
            className="upload-list-inline"
          >
            <Button icon={<UploadOutlined />} loading={isUploading}>
              Upload
            </Button>
          </Upload>
          <Input
            disabled
            value={value}
            placeholder="Chỉ hỗ trợ tệp JPG, JPEG, GIF hoặc PNG với dung lượng tối đa 2M"
          />
        </div>
      </div>
    </>
  )
}
