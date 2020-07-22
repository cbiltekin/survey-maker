import React from 'react';
import { Modal, Form, Input} from 'antd';


const PopUpForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new survey"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Survey Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of survey!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpForm;