import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, Media } from 'reactstrap';
import Calendar from '../../common/Calendar';

const ReportBadge = ({ text, ...rest }) => <Badge {...rest}>{text}</Badge>;

ReportBadge.propTypes = {
  ...Badge.propTypes,
  text: PropTypes.string.isRequired
};

const Summary = ({ calendar, title, badge, divider, to, children }) => (
  <Media>
    <Calendar {...calendar} />
    <Media body className="position-relative pl-3">
      <h6 className="fs-0 mb-0">
        <Link to={to}>{title}</Link> {badge && <ReportBadge {...badge} className="ml-1" />}
      </h6>
      {children}
      {divider && <hr className="border-dashed border-bottom-0" />}
    </Media>
  </Media>
);

Summary.propTypes = {
  calendar: PropTypes.shape(Calendar.propTypes).isRequired,
  title: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  badge: PropTypes.shape(ReportBadge.propTypes),
  children: PropTypes.node,
  divider: PropTypes.bool
};

Summary.defaultProps = { divider: true };

export default Summary;
