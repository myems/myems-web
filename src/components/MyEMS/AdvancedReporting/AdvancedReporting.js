import React, { Fragment, useEffect, useState } from 'react';
import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput
} from 'reactstrap';
import Summary from './Summary';
import Loader from '../../common/Loader';
import FalconCardHeader from '../../common/FalconCardHeader';
import useFakeFetch from '../../../hooks/useFakeFetch';
import uuid from 'uuid/v1';
import Datetime from 'react-datetime';
import createMarkup from '../../../helpers/createMarkup';
import { isIterableArray } from '../../../helpers/utils';
import { withTranslation } from 'react-i18next';


const AdvacnedReporting = ({ t }) => {

  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(null);
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(null);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const rawReports = [
    {
      id: uuid(),
      calendar: { month: 'Mar', day: '26' },
      title: "空间数据日报",
      additional: t('Created Datetime') + ': ' + '2020-03-26 11:00AM' + '<br/>' +
        t('File Format') + ': ' + 'XLSX' + '<br/>' + t('File Size') + ': ' + '1.3 MB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Jul', day: '21' },
      title: '设备数据日报',
      additional: t('Created Datetime') + ': ' + '2020-07-21 11:00AM' + '<br/>' +
        t('File Format') + ': ' + 'DOCX' + '<br/>' + t('File Size') + ': ' + '1.3 MB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Jul', day: '21' },
      title: '租户数据日报',
      additional: t('Created Datetime') + ': ' + '2020-07-21 11:00AM' + '<br/>' +
        t('File Format') + ': ' + 'DOCX' + '<br/>' + t('File Size') + ': ' + '1.3 MB',
      to: '#',
      badge: {
        text: 'New',
        color: 'soft-success',
        pill: true
      }
    },
    {
      id: uuid(),
      calendar: { month: 'Jul', day: '31' },
      title: '门店数据日报',
      additional: t('Created Datetime') + ': ' + '2020-07-31 11:00AM' + '<br/>' +
        t('File Format') + ': ' + 'XLSX' + '<br/>' + t('File Size') + ': ' + '1.3 MB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Jul', day: '16' },
      title: '车间数据日报',
      additional: t('Created Datetime') + ': ' + '2020-07-16 11:00AM' + '<br/>' +
        t('File Format') + ': ' + 'XLSX' + '<br/>' + t('File Size') + ': ' + '1.3 MB',
      to: '#'
    }
  ];
  const { loading, data: reports } = useFakeFetch(rawReports);

  return (
    <Fragment>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingPeriodBeginsDatetime">
                  {t('Reporting Period Begins')}
                </Label>
                <Datetime id='reportingPeriodBeginsDatetime' />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingPeriodEndsDatetime">
                  {t('Reporting Period Ends')}
                </Label>
                <Datetime id='reportingPeriodEndsDatetime' />
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
      <Card>
        <FalconCardHeader title={t('Advanced Reporting')}></FalconCardHeader>
        <CardBody className="fs--1">
          {loading ? (
            <Loader />
          ) : isIterableArray(reports) ? (
            <Row>
              {reports.map(({ additional, ...rest }, index) => (
                <Col md={6} className="h-100" key={index}>
                  <Summary divider={reports.length !== index + 1} {...rest}>
                    <p className="text-1000 mb-0" dangerouslySetInnerHTML={createMarkup(additional)} />
                  </Summary>
                </Col>
              ))}
            </Row>
          ) : (
                <Alert color="info" className="mb-0">
                  {t('No data found')}
                </Alert>
              )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(AdvacnedReporting);
