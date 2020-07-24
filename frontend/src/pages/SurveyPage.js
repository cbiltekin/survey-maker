import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import PopUpForm from '../components/PopUpForm';
import { createSurvey } from '../api/apiCalls';
import { useDispatch } from 'react-redux';
import { Button} from 'antd';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from '../components/ButtonWithProgress';

const SurveyPage = (props) => {

    const [surveyName, setSurveyname] = useState();
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setErrors({});
    }, [surveyName]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setSurveyname(value);
      };

    const onClickSurvey = async () => {
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
                errors = {errors}
                onClick={onClickSurvey}
                onCancel={() => {
                    setErrors({});
                    setVisible(false);
                }}
                onChange = {onChange}
            />
        </div>
    );
};

export default SurveyPage;