import React from 'react'
import { Button, Form, Input } from 'antd'
import { usePermission } from '@/contexts/permissionContext'
import {
  useGetMerchants,
  useUpdateTestMerchants,
} from '@/hooks/useTestMerchant'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'

import { PageContent, PageHeader } from '@/components/Layout'

function ConfigMerchantTest() {
  const { isLoading, data } = useGetMerchants()
  const merchants = data?.merchants || []
  const initialMerchants = { merchants }
  const { can } = usePermission()

  const notAllowUpdateMerchantTest = !can('test.update')

  const { isSaveLoading, mutateAsync } = useUpdateTestMerchants()

  async function updateMerchantTests(formValue) {
    try {
      const merchants = formValue.merchants?.split(',') || []

      await mutateAsync(merchants)
    } catch (err) {
      //
    }
  }

  return (
    <>
      <PageHeader>
        <AntPageHeader title="Cấu hình gian hàng dùng thử" />
      </PageHeader>
      <PageContent loading={isLoading}>
        <Form
          layout="vertical"
          onFinish={updateMerchantTests}
          initialValues={initialMerchants}
        >
          <Form.Item
            name="merchants"
            label="Gian hàng dùng thử"
            help="Các merchant id cách nhau bởi dấu phẩy, ví dụ 123,456,789"
          >
            <Input.TextArea
              autoSize={{ minRows: 20 }}
              placeholder="Nhập các merchant id"
              style={{ maxWidth: 950 }}
              disabled={notAllowUpdateMerchantTest}
            />
          </Form.Item>
          <Form.Item style={{ marginTop: 12 }}>
            <Button
              type="primary"
              loading={isSaveLoading}
              htmlType="submit"
              disabled={notAllowUpdateMerchantTest}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </PageContent>
    </>
  )
}

export default ConfigMerchantTest
