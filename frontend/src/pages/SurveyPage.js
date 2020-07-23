import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import PopUpForm from '../components/PopUpForm';
import { createSurvey } from '../api/apiCalls';
import { useDispatch } from 'react-redux';
import { useApiProgress } from '../shared/ApiProgress';
import { Button} from 'antd';

const SurveyPage = (props) => {

    const [surveyName, setSurveyname] = useState();
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
 
    const onChange = (event) => {
        const { name, value } = event.target;
        setSurveyname(value);
      };

    const onClickSurvey = async (event) => {
        const { history } = props;
        const { push } = history;

        const body = {
            surveyName
        };

        try{
            await createSurvey(body);
            setVisible(false);
            push('/create');
        } catch (error){
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('/api/1.0/surveys');
    const buttonEnabled = surveyName;

    return (
        <div className="container">
             <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}>
                New Survey
      </Button>
           
     
            <PopUpForm
                visible={visible}
                title={t('Create a survey')}
                okText = {t('Create')}
                label={t('Survey Title')}
                name = "surveyName"
                buttonEnabled = {buttonEnabled}
                pendingApiCall = {pendingApiCall}
                errors = {errors}
                onClick={onClickSurvey}
                onCancel={() => {
                    setVisible(false);
                }}
                onChange = {onChange}
            />
        </div>
    );
};

export default SurveyPage;