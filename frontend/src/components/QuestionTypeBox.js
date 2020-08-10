import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio} from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';



const QuestionTypeBox = ({ visible, onClick, onCancel, onChange, value }) => {
    const pendingApiCall = useApiProgress('/api/1.0/questions');
  
    const handleOk = () => {
      onClick();
    };

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Modal
        visible={visible}
        title="Please choose a question type."
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
          text="Create"  />
          </React.Fragment>
          ,
        ]}
        
      >
        <Radio.Group onChange={onChange} value={value}>
        <Radio style={radioStyle} value={1}>
          Multiple Choice
        </Radio>
        <Radio style={radioStyle} value={2}>
          CheckBox
        </Radio>
        <Radio style={radioStyle} value={3}>
          Star Rating
        </Radio>
        <Radio style={radioStyle} value={4}>
          Text Box
        </Radio>
      </Radio.Group>
      </Modal>
    );
  };

export default QuestionTypeBox;