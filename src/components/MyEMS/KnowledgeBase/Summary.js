import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, Media } from 'reactstrap';
import Calendar from '../../common/Calendar';
import { withTranslation } from 'react-i18next';



const FileBadge = ({ text, ...rest }) => <Badge {...rest}>{text}</Badge>;

FileBadge.propTypes = {
  ...Badge.propTypes,
  text: PropTypes.string.isRequired
};

const Summary = ({ calendar, title, badge, uploader, divider, to, children, t }) => (
  <Media>
    <Calendar {...calendar} />
    <Media body className="position-relative pl-3">
      <h6 className="fs-0 mb-0">
        <Link to={to}>{title}</Link> {badge && <FileBadge {...badge} className="ml-1" />}
      </h6>
      <p className="mb-1">
        上传者{' '}
        <Link to="#!" className="text-700">
          {uploader}
        </Link>
      </p>
      {children}
      {divider && <hr className="border-dashed border-bottom-0" />}
    </Media>
  </Media>
);

Summary.propTypes = {
  calendar: PropTypes.shape(Calendar.propTypes).isRequired,
  title: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  badge: PropTypes.shape(FileBadge.propTypes),
  children: PropTypes.node,
  divider: PropTypes.bool
};

Summary.defaultProps = { divider: true };

export default withTranslation()(Summary);
