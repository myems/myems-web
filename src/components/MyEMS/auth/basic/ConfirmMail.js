import React from 'react';
import ConfirmMailContent from '../ConfirmMailContent';
import { withTranslation } from 'react-i18next';

const ConfirmMail = ({ t }) => (
  <div className="text-center">
    <ConfirmMailContent email="xyz@myems.io" />
  </div>
);

export default withTranslation()(ConfirmMail);
