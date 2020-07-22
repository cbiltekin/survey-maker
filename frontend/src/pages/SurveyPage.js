import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import PopUpForm from '../components/PopUpForm';
import { Button } from 'antd';
import { createSurvey } from '../api/apiCalls';
import { useDispatch } from 'react-redux';

const SurveyPage = (props) => {

    const [surveyName, setSurveyname] = useState();

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const onChange = (event) => {
        const { value } = event.target;
        setSurveyname(value);
      };

    const onClickSurvey = async (event) => {
        const { history } = props;
        const { push } = history;

        const body = {
            surveyName
        };

        try{
            await dispatch(createSurvey(body));
            push('/create');
        } catch {
        }
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
                New Survey
      </Button>
            <PopUpForm
                visible={visible}
                title={"Create a survey"}
                okText = {"Create"}
                label={t('Survey Title')}
                name = "surveyName"
                onCreate={onClickSurvey}
                onCancel={() => {
                    setVisible(false);
                }}
                onChange = {onChange}
            />
        </div>
    );
};

export default SurveyPage;