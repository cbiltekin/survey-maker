import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import PopUpForm from '../components/PopUpForm';
import { Button } from 'antd';

const SurveyPage = (props) => {

    const [visible, setVisible] = useState(false);

    const history = useHistory();

    const routeSurvey = () => {
        setVisible(false);
        const path = '/create';
        history.push(path);
    }

    const { t } = useTranslation();
    
    return (
        <div className="container">
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                New Collection
      </Button>
            <PopUpForm
                visible={visible}
                onCreate={routeSurvey}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default SurveyPage;