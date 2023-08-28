import React from 'react'
import { css } from '@emotion/react'
import { Button, Col, Form, Image, Input, Radio, Row } from 'antd'
import KeyIcon from '@/assets/key.svg'
import { actionsInTabPermission } from '@/constants/roles'
import { flat, mapPermissionToArray } from '@/helpers/array'
// import { useLeavePrevention } from '@/hooks/useLeavePrevention'
import { useMutationCreateRole, useMutationUpdateRole } from '@/hooks/useRole'
import ResourcesCheckboxGroup from '../../components/Resource/ResourcesCheckboxGroup'

export default function RoleForm({
  initialValues,
  action,
  resources,
  activeItem,
  setActiveItem,
  setAction,
  setRole,
}) {
  // const [isDirty, setIsDirty] = React.useState(false)
  const { mutate: createRole, isLoading: isCreateLoading } =
    useMutationCreateRole()
  const { mutate: updateRole, isLoading: isUpdateLoading } =
    useMutationUpdateRole()

  const [form] = Form.useForm()
  // const isFormDirty = () => isDirty
  // useLeavePrevention(isFormDirty)
  // const handleOnChange = () => {
  //   if (isDirty) return
  //   setIsDirty(true)
  // }
  const handleSubmit = data => {
    const submitData = {
      ...data,
      name: data.name.trim(),
      notes: data.notes.trim(),
      abilities: flat(data.abilities),
    }

    switch (action) {
      case actionsInTabPermission.CREATE:
        return createRole(submitData, {
          onSuccess: data => {
            setRole({
              ...data,
              abilities: mapPermissionToArray(
                resources,
                data.abilities || [],
                resources.length,
              ),
            })
            setActiveItem(data.id)
            setAction(actionsInTabPermission.READ)
            // setIsDirty(false)
          },
        })
      case actionsInTabPermission.UPDATE:
        return updateRole(
          { id: initialValues.id, ...submitData },
          {
            onSuccess: () => {
              setAction(actionsInTabPermission.READ)
              // setIsDirty(false)
            },
          },
        )
      case actionsInTabPermission.READ:
        return
      case actionsInTabPermission.DELETE:
        return
      default:
        return
    }
  }
  return (
    <div>
      <Form
        id="formPermission"
        onFinish={handleSubmit}
        form={form}
        layout={'horizontal'}
        // onChange={handleOnChange}
        initialValues={initialValues}
        autoComplete="off"
        css={css({
          '& .ant-form-item-label': {
            fontWeight: 600,
            padding: 0,
          },
        })}
      >
        <Row>
          <Col span={12} offset={1}>
            <Form.Item
              label="Tên vai trò"
              labelCol={{ span: 24 }}
              name="name"
              rules={[
                {
                  whitespace: true,
                  message: 'Tên vai trò không được để trống',
                },
                { required: true, message: 'Vui lòng nhập tên vai trò' },
              ]}
            >
              {action !== actionsInTabPermission.READ ? (
                <Input maxLength={255} placeholder="Nhập tên vai trò" />
              ) : (
                <p
                  css={css`
                    margin: 0;
                    padding: 0;
                  `}
                >
                  {initialValues.name}
                </p>
              )}
            </Form.Item>
          </Col>
          <Col
            css={css({
              '& .ant-radio-disabled + span': {
                color: 'rgba(0,0,0,1)',
              },
              '&': {
                marginLeft: '40px',
              },
            })}
          >
            <Form.Item
              label="Trạng thái hoạt động"
              labelCol={{ span: 24 }}
              name="status"
            >
              <Radio.Group disabled={action === actionsInTabPermission.READ}>
                <Radio value={true}> Hoạt động </Radio>
                <Radio value={false}> Ngừng hoạt động </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={1}>
            <Form.Item label="Ghi chú" labelCol={{ span: 24 }} name="notes">
              {action !== actionsInTabPermission.READ ? (
                <Input maxLength={255} placeholder="Nhập ghi chú cho vai trò" />
              ) : (
                <p
                  css={css`
                    margin: 0;
                    padding: 0;
                  `}
                >
                  {initialValues.notes || '--'}
                </p>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Col
          span={20}
          offset={1}
          css={css`
            padding-bottom: 4px;
            border-bottom: 2px solid #f3f4f6;
            display: flex;
          `}
        >
          <div
            css={css`
              background: #f3f4f6;
              padding: 12px 16px;
              border-radius: 50%;
              width: 48px;
              height: 48px;
              margin-right: 24px;
            `}
          >
            <Image
              src={KeyIcon}
              alt="key-icon"
              preview={false}
              style={{ maxWidth: 22, maxHeight: 22 }}
            />
          </div>
          <div>
            <h3
              css={css`
                font-weight: 700;
                font-size: 14px;
                line-height: 22px;
                color: #091e42;
                margin: 0;
              `}
            >
              Phân quyền
            </h3>
            <p
              css={css`
                font-weight: 400;
                font-size: 13px;
                line-height: 22px;
                color: #172b4d;
              `}
            >
              Chọn các thao tác người dùng thuộc nhóm này có thể thực hiện
            </p>
          </div>
        </Col>

        <Col
          span={6}
          offset={1}
          css={css`
            padding: 20px 20px 10px;
          `}
        >
          <div>
            <h3
              css={css`
                font-weight: 700;
                font-size: 14px;
                line-height: 22px;
                color: #091e42;
                margin: 0;
              `}
            >
              Resource
            </h3>
          </div>
        </Col>

        <Col offset={1} span={20}>
          <Form.Item name="abilities">
            <ResourcesCheckboxGroup
              resources={resources}
              active={action !== actionsInTabPermission.READ}
              defaultCloseAllCheckbox={action === actionsInTabPermission.CREATE}
            />
          </Form.Item>
        </Col>
        {action !== actionsInTabPermission.READ ? (
          <Row>
            <Col span={16} offset={1}></Col>
            <Col span={2}>
              <Button
                css={css`
                  color: #283593;
                  border-color: #283593;
                  font-weight: 600;
                  font-size: 13px;
                  line-height: 20px;
                  border-radius: 4px;
                `}
                onClick={() => {
                  form.setFieldsValue(initialValues)
                }}
              >
                Hủy
              </Button>
            </Col>
            <Col span={2}>
              <Button
                type="primary"
                css={css`
                  background-color: #283593;
                  border-color: #283593;
                  font-weight: 600;
                  font-size: 13px;
                  line-height: 20px;
                  border-radius: 4px;
                `}
                htmlType="submit"
                loading={isCreateLoading || isUpdateLoading}
              >
                Lưu
              </Button>
            </Col>
          </Row>
        ) : null}
      </Form>
    </div>
  )
}
