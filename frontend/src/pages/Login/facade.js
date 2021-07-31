import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import _ from "lodash";
import axios from "axios";

export const useLoginFacade = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const [validEmail, setValidEmail] = useState(false);
    const [message, setMessage] = useState('');
    const onFormChange = (
        key,
        value,
      ) => {
        const copy = _.cloneDeep(formData);
        _.set(copy, key, value);
        setFormData(copy); //TODO: setformdata facade
      };

    const doLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/signup', {type: 'obj',data: formData})
            if(res.status === 200) {
                setValidEmail(true);
            } else {
                setValidEmail(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if(validEmail) {
            history.push('/map');
        } else {
            setMessage('login failed');
        }
    }, [validEmail]);

    return {
        formData,
        onFormChange,
        doLogin
    }
}