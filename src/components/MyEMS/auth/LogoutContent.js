import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createCookie } from '../../../helpers/utils';
import rocket from '../../../assets/img/illustrations/rocket.png';
import { withTranslation } from 'react-i18next';

const LogoutContent = ({ layout, titleTag: TitleTag, t }) => {
  useEffect(() => {
    createCookie('user_name', '', 0);
    createCookie('user_uuid', '', 0);
    createCookie('user_token', '', 0);
    createCookie('is_logged_in', false, 0);
  }, []);
  return (
    <Fragment>
      <img className="d-block mx-auto mb-4" src={rocket} alt="shield" width={70} />
      <TitleTag>{t('Thanks for using MyEMS!')}</TitleTag>
      <p>
        {t('You are now successfully signed out.')}
      </p>
      <Button tag={Link} color="primary" size="sm" className="mt-3" to={`/authentication/${layout}/login`}>
        <FontAwesomeIcon icon="chevron-left" transform="shrink-4 down-1" className="mr-1" />
        {t('Return to Login')}
      </Button>
    </Fragment>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

LogoutContent.defaultProps = {
  layout: 'basic',
  titleTag: 'h4'
};

export default  withTranslation()(LogoutContent);
