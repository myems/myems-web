import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Form } from 'reactstrap';
import withRedirect from '../../../hoc/withRedirect';
import FalconCardHeader from '../../common/FalconCardHeader';
import FormGroupInput from '../../common/FormGroupInput';
import { withTranslation } from 'react-i18next';

const ChangePasswordForm = ({ setRedirect, setRedirectUrl, layout, t }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  
  useEffect(() => {
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') return setIsDisabled(true);

    setIsDisabled(newPassword !== confirmPassword);
  }, [oldPassword, newPassword, confirmPassword]);

  const handleSubmit = e => {
    e.preventDefault();
    if (true) {
      toast.success(t('Password has been changed!'));
      setRedirect(true);
    }
  };

  useEffect(() => {
    setRedirectUrl(`/`);
  }, [setRedirectUrl, layout]);

  return (
    <Card className="mb-3">
      <FalconCardHeader title={t('Change Password')} light={false} />
      <CardBody className="bg-light">
        <Form onSubmit={handleSubmit}>
          <FormGroupInput
            id="old-password"
            label={t('Old Password')}
            value={oldPassword}
            onChange={({ target }) => setOldPassword(target.value)}
            type="password"
          />
          <FormGroupInput
            id="new-password"
            label={t('New Password')}
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
            type="password"
          />
          <FormGroupInput
            id="confirm-password"
            label={t('Confirm Password')}
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
          />
          <Button color="primary" block disabled={isDisabled}>
          {t('Update Password')}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

ChangePasswordForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  setRedirectUrl: PropTypes.func.isRequired,
  layout: PropTypes.string
};

ChangePasswordForm.defaultProps = { layout: 'basic' };

export default withTranslation()(withRedirect(ChangePasswordForm));
