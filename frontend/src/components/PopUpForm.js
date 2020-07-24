import React from 'react';
import { Button, Modal, Form, Input} from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';



const PopUpForm = ({ visible, title, okText, label, name, errors, onClick, onCancel, onChange }) => {
  const [form] = Form.useForm();
  const pendingApiCall = useApiProgress('/api/1.0/surveys');

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
        <Button key="back" onClick={onCancel} disabled = {pendingApiCall}>
          Cancel
        </Button>,
        <React.Fragment key="submit">
        <ButtonWithProgress 
        onClick={handleOk}
        pendingApiCall={pendingApiCall} 
        disabled={pendingApiCall} 
        text={okText}  />
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
        </Form.Item>
        <div className="text-danger">
        {errors.surveyName}
        </div>
      </Form>
    </Modal>
  );
};

export default PopUpForm;