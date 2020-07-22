import React from 'react';
import { Modal, Form, Input} from 'antd';



const PopUpForm = ({ visible, title, okText, label, name, onCreate, onCancel, onChange }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
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
          name={name}
          label={label}
          rules={[
            {
              required: true,
              message: 'Please input the title of survey!',
            },
          ]}
        >
          <Input onChange={onChange}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpForm;