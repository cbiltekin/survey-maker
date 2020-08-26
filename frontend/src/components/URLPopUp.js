import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';



const URLPopUp = ({ id, onClick, visible }) => {

  const handleOK = () => {
    onClick();
  }

  return (
    <Modal
      visible={visible}
      title="Share your survey with people!"
      onOk={handleOK}
      onCancel={handleOK}
      footer={[
        <Button key="ok" onClick={handleOK}>
          Ok
        </Button>
      ]}>
            <p>Copy below URL to send your friends!</p>
            <p>http://localhost:3000/#/answer/{id}</p>
    </Modal>
  );
};

export default URLPopUp;