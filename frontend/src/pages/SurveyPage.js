import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import PopUpForm from '../components/PopUpForm';
import { Button } from 'antd';
import { createSurvey } from '../api/apiCalls';
import { useDispatch } from 'react-redux';

const SurveyPage = (props) => {

    const [surveyname, setSurveyname] = useState();

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const onClickSurvey = async (event) => {
        // event.preventDefault();
        const body = {
            surveyname
        };
        const { history } = props;
        const { push } = history;

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
                onCreate={onClickSurvey}
                onCancel={() => {
                    setVisible(false);
                }}
                onChange = {event => setSurveyname(event.target.value)}
            />
        </div>
    );
};

export default SurveyPage;