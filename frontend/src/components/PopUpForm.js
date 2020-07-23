import React from 'react';
import { Button, Modal, Form, Input} from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';



const PopUpForm = ({ visible, title, okText, label, name, buttonEnabled, pendingApiCall, errors, onClick, onCancel, onChange }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
          .validateFields()
          .then(values => {
            form.resetFields();
            onClick(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
  };
  return (
    <Modal
      visible={visible}
      title={title}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <React.Fragment key="submit">
        <ButtonWithProgress 
        disabled={!buttonEnabled || pendingApiCall} 
        pendingApiCall={pendingApiCall} 
        text={okText} onClick={handleOk} />
        </React.Fragment>
        ,
      ]}
      
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
          
        >
          <Input onChange={onChange}/>
          <div class="text-danger">
        {errors.surveyName}
        </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopUpForm;