import React, { createRef, Fragment, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Cascader from 'rc-cascader';
import RealtimeChart from './RealtimeChart';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { cascaderOptions } from '../common/cascaderOptions';


const MeterRealtime = ({ setRedirect, setRedirectUrl,  t }) => {
  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (is_logged_in === null || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, 1000*60*60*8);
      createCookie('user_name', user_name, 1000*60*60*8);
      createCookie('user_display_name', user_display_name, 1000*60*60*8);
      createCookie('user_uuid', user_uuid, 1000*60*60*8);
      createCookie('token', token, 1000*60*60*8);
    }
  }, []);
  let table = createRef();
  // State
  const [selectedSpace, setSelectedSpace] = useState([{label: '成都项目', value: 1}].map(o => o.label).join('/'));


  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Meter Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Meter Realtime')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                  {t('Space')}
                </Label>
                <br />
                <Cascader options={cascaderOptions}
                  onChange={onCascaderChange}
                  changeOnSelect
                  expandTrigger="hover">
                  <Input value={selectedSpace} readOnly />
                </Cascader>
              </FormGroup>
            </Col>

            <Col xs="auto">
              <FormGroup>
                <br></br>
                <ButtonGroup id="submit">
                  <Button color="success" >{t('Submit')}</Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row noGutters>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart title={'CW_TOTA_M01_001'} />
        </Col>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart title={'EL_P1PR_D13_003'} />
        </Col>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart title={'EL_P2PR_D24_003'} />
        </Col>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart title={'EL_P1OF_D15_005'} />
        </Col>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart title={'EL_P3HP_D40_005'} />
        </Col>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart title={'AP_P1AC_D12_003'} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default withTranslation()(withRedirect(MeterRealtime));
