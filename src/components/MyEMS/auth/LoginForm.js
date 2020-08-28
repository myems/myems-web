import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppContext from '../../../context/Context';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import { createCookie, getItemFromStore, setItemToStore } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';

const LoginForm = ({ setRedirect, hasLabel, layout, t }) => {
  // State
  const [email, setEmail] = useState(getItemFromStore('email', ''));
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  // Context
  const { language, setLanguage } = useContext(AppContext);

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    // todo: call login api
    var user_name = 'administrator';
    var user_uuid = 'dcdb67d1-6116-4987-916f-6fc6cf2bc0e4';
    var user_token = 'b849ecdd-d335-428f-a6e5-760a431867a8';

    toast.success(t('Logged in as ') + `${email}`);

    if (remember) {
      setItemToStore('email', email);
    } else {
      setItemToStore('email', '');
    }
    
    createCookie('user_name', user_name, 1000*60*60*8);
    createCookie('user_uuid', user_uuid, 1000*60*60*8);
    createCookie('user_token', user_token, 1000*60*60*8);
    createCookie('is_logged_in', true, 1000*60*60*8);
    
    setRedirect(true);
  };

  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>{t('Email address')}</Label>}
        <Input
          placeholder={!hasLabel ? t('Email address') : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>{t('Password')}</Label>}
        <Input
          placeholder={!hasLabel ? t('Password') : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label={t('Remember me')}
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/authentication/${layout}/forget-password`}>
            {t('Forget Password?')}
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
        {t('Log in')}
        </Button>
      </FormGroup>
      <CustomInput
          type="select"
          id="language"
          name="language"
          className="mb-3"
          value={language}
          onChange={({ target }) => setLanguage(target.value)}
        >
          <option value="zh_cn">{t('language-zh_cn')}</option>
          <option value="en">{t('language-en')}</option>
          <option value="de">{t('language-de')}</option>
        </CustomInput>
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default withTranslation()(withRedirect(LoginForm));
