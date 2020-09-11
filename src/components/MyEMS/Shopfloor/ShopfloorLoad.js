import React, { Fragment, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
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
import CountUp from 'react-countup';
import Datetime from 'react-datetime';
import moment from 'moment';
import loadable from '@loadable/component';
import Cascader from 'rc-cascader';
import CardSummary from '../common/CardSummary';
import LineChart from '../common/LineChart';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { baseURL } from '../../../config';
import { periodTypeOptions } from '../common/PeriodTypeOptions';
import { comparisonTypeOptions } from '../common/ComparisonTypeOptions';


const DetailedDataTable = loadable(() => import('../common/DetailedDataTable'));

const ShopfloorLoad = ({ setRedirect, setRedirectUrl, t }) => {
  let current_moment = moment();
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
      createCookie('is_logged_in', true, 1000 * 60 * 60 * 8);
      createCookie('user_name', user_name, 1000 * 60 * 60 * 8);
      createCookie('user_display_name', user_display_name, 1000 * 60 * 60 * 8);
      createCookie('user_uuid', user_uuid, 1000 * 60 * 60 * 8);
      createCookie('token', token, 1000 * 60 * 60 * 8);
    }
  });
  // State
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);
  const [shopfloorList, setShopfloorList] = useState([]);
  const [selectedShopfloor, setSelectedShopfloor] = useState(undefined);
  const [comparisonType, setComparisonType] = useState('month-on-month');
  const [periodType, setPeriodType] = useState('daily');
  const [basePeriodBeginsDatetime, setBasePeriodBeginsDatetime] = useState(current_moment.clone().subtract(1, 'months').startOf('month'));
  const [basePeriodEndsDatetime, setBasePeriodEndsDatetime] = useState(current_moment.clone().subtract(1, 'months'));
  const [basePeriodBeginsDatetimeDisabled, setBasePeriodBeginsDatetimeDisabled] = useState(true);
  const [basePeriodEndsDatetimeDisabled, setBasePeriodEndsDatetimeDisabled] = useState(true);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(current_moment.clone().startOf('month'));
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(current_moment);
  const [cascaderOptions, setCascaderOptions] = useState(undefined);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let isResponseOK = false;
    fetch(baseURL + '/spaces/tree', {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      console.log(response);
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      console.log(json);
      if (isResponseOK) {
        // rename keys 
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        setCascaderOptions(json);
        setSelectedSpaceName([json[0]].map(o => o.label));
        setSelectedSpaceID([json[0]].map(o => o.value));
        // get Shopfloors by root Space ID
        let isResponseOK = false;
        fetch(baseURL + '/spaces/' + [json[0]].map(o => o.value) + '/shopfloors', {
          method: 'GET',
          headers: {
            "Content-type": "application/json",
            "User-UUID": getCookieValue('user_uuid'),
            "Token": getCookieValue('token')
          },
          body: null,

        }).then(response => {
          if (response.ok) {
            isResponseOK = true;
          }
          return response.json();
        }).then(json => {
          if (isResponseOK) {
            json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
            console.log(json);
            setShopfloorList(json[0]);
            if (json[0].length > 0) {
              setSelectedShopfloor(json[0][0].value);
              setIsDisabled(false);
            } else {
              setSelectedShopfloor(undefined);
              setIsDisabled(true);
            }
          } else {
            toast.error(json.description)
          }
        }).catch(err => {
          console.log(err);
        });
        // end of get Shopfloors by root Space ID
      } else {
        toast.error(json.description);
      }
    }).catch(err => {
      console.log(err);
    });

  }, []);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const shopfloorLineChartLabels = [
    '2020-07-01',
    '2020-07-02',
    '2020-07-03',
    '2020-07-04',
    '2020-07-05',
    '2020-07-06',
    '2020-07-07',
    '2020-07-08',
    '2020-07-09',
    '2020-07-10',
    '2020-07-11',
    '2020-07-12'
  ];

  const shopfloorLineChartData = {
    a0: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    a1: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    a2: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
  };


  const shopfloorLineChartOptions = [
    { value: 'a', label: '电' },
    { value: 'b', label: '自来水' },
    { value: 'c', label: '天然气' },
    { value: 'd', label: '冷' },];

  const parameterLineChartLabels = [
    '2020-07-01',
    '2020-07-02',
    '2020-07-03',
    '2020-07-04',
    '2020-07-05',
    '2020-07-06',
    '2020-07-07',
    '2020-07-08',
    '2020-07-09',
    '2020-07-10',
    '2020-07-11',
    '2020-07-12'
  ];

  const parameterLineChartData = {
    a0: [40, 31, 36, 32, 27, 32, 34, 26, 25, 24, 25, 30],
    a1: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    a2: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    a3: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    a4: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };

  const parameterLineChartOptions = [
    { value: 'a0', label: '室外温度' },
    { value: 'a1', label: '相对湿度' },
    { value: 'a2', label: '电费率' },
    { value: 'a3', label: '自来水费率' },
    { value: 'a4', label: '天然气费率' }];

  const detailedDataTableData = [
    {
      id: 1,
      startdatetime: '2020-07-01',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 2,
      startdatetime: '2020-07-02',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 3,
      startdatetime: '2020-07-03',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 4,
      startdatetime: '2020-07-04',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 5,
      startdatetime: '2020-07-05',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 6,
      startdatetime: '2020-07-06',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 7,
      startdatetime: '2020-07-07',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 8,
      startdatetime: '2020-07-08',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 9,
      startdatetime: '2020-07-09',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 10,
      startdatetime: '2020-07-10',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    },
    {
      id: 11,
      startdatetime: '平均',
      a0: '98.172',
      a1: '34.157',
      a2: '56.127',
      a3: '56.357',
    }
  ];
  const detailedDataTableColumns = [{
    dataField: 'startdatetime',
    text: t('Datetime'),
    sort: true
  }, {
    dataField: 'a0',
    text: '电平均负荷 (kW)',
    sort: true
  }, {
    dataField: 'a1',
    text: '自来水平均负荷 (M3/h)',
    sort: true
  }, {
    dataField: 'a2',
    text: '天然气平均负荷 (M3/)',
    sort: true
  }, {
    dataField: 'a3',
    text: '冷平均负荷 (kW)',
    sort: true
  }];

  let onSpaceCascaderChange = (value, selectedOptions) => {
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    setSelectedSpaceID(value[value.length - 1]);

    let isResponseOK = false;
    fetch(baseURL + '/spaces/' + value[value.length - 1] + '/shopfloors', {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      if (isResponseOK) {
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        console.log(json)
        setShopfloorList(json[0]);
        if (json[0].length > 0) {
          setSelectedShopfloor(json[0][0].value);
          setIsDisabled(false);
        } else {
          setSelectedShopfloor(undefined);
          setIsDisabled(true);
        }
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });
  }


  let onComparisonTypeChange = ({ target }) => {
    console.log(target.value);
    setComparisonType(target.value);
    if (target.value === 'year-over-year') {
      setBasePeriodBeginsDatetimeDisabled(true);
      setBasePeriodEndsDatetimeDisabled(true);
      setBasePeriodBeginsDatetime(moment(reportingPeriodBeginsDatetime).subtract(1, 'years'));
      setBasePeriodEndsDatetime(moment(reportingPeriodEndsDatetime).subtract(1, 'years'));
    } else if (target.value === 'month-on-month') {
      setBasePeriodBeginsDatetimeDisabled(true);
      setBasePeriodEndsDatetimeDisabled(true);
      setBasePeriodBeginsDatetime(moment(reportingPeriodBeginsDatetime).subtract(1, 'months'));
      setBasePeriodEndsDatetime(moment(reportingPeriodEndsDatetime).subtract(1, 'months'));
    } else if (target.value === 'free-comparison') {
      setBasePeriodBeginsDatetimeDisabled(false);
      setBasePeriodEndsDatetimeDisabled(false);
    } else if (target.value === 'none-comparison') {
      setBasePeriodBeginsDatetime(undefined);
      setBasePeriodEndsDatetime(undefined);
      setBasePeriodBeginsDatetimeDisabled(true);
      setBasePeriodEndsDatetimeDisabled(true);
    }
  }

  let onBasePeriodBeginsDatetimeChange = (newDateTime) => {
    setBasePeriodBeginsDatetime(newDateTime);
  }

  let onBasePeriodEndsDatetimeChange = (newDateTime) => {
    setBasePeriodEndsDatetime(newDateTime);
  }

  let onReportingPeriodBeginsDatetimeChange = (newDateTime) => {
    setReportingPeriodBeginsDatetime(newDateTime);
    if (comparisonType === 'year-over-year') {
      setBasePeriodBeginsDatetime(newDateTime.clone().subtract(1, 'years'));
    } else if (comparisonType === 'month-on-month') {
      setBasePeriodBeginsDatetime(newDateTime.clone().subtract(1, 'months'));
    }
  }

  let onReportingPeriodEndsDatetimeChange = (newDateTime) => {
    setReportingPeriodEndsDatetime(newDateTime);
    if (comparisonType === 'year-over-year') {
      setBasePeriodEndsDatetime(newDateTime.clone().subtract(1, 'years'));
    } else if (comparisonType === 'month-on-month') {
      setBasePeriodEndsDatetime(newDateTime.clone().subtract(1, 'months'));
    }
  }

  var getValidBasePeriodBeginsDatetimes = function (currentDate) {
    return currentDate.isBefore(moment(basePeriodEndsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidBasePeriodEndsDatetimes = function (currentDate) {
    return currentDate.isAfter(moment(basePeriodBeginsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidReportingPeriodBeginsDatetimes = function (currentDate) {
    return currentDate.isBefore(moment(reportingPeriodEndsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidReportingPeriodEndsDatetimes = function (currentDate) {
    return currentDate.isAfter(moment(reportingPeriodBeginsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(selectedSpaceID);
    console.log(selectedShopfloor);
    console.log(periodType);
  };


  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Shopfloor Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Load')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {t('Space')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="shopfloorSelect">
                    {t('Shopfloor')}
                  </Label>
                  <CustomInput type="select" id="shopfloorSelect" name="shopfloorSelect" onChange={({ target }) => setSelectedShopfloor(target.value)}
                  >
                    {shopfloorList.map((shopfloor, index) => (
                      <option value={shopfloor.value} key={shopfloor.value}>
                        {shopfloor.label}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="comparisonType">
                    {t('Comparison Types')}
                  </Label>
                  <CustomInput type="select" id="comparisonType" name="comparisonType"
                    defaultValue="month-on-month"
                    onChange={onComparisonTypeChange}
                  >
                    {comparisonTypeOptions.map((comparisonType, index) => (
                      <option value={comparisonType.value} key={comparisonType.value} >
                        {t(comparisonType.label)}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="periodType">
                    {t('Period Types')}
                  </Label>
                  <CustomInput type="select" id="periodType" name="periodType" defaultValue="daily" onChange={({ target }) => setPeriodType(target.value)}
                  >
                    {periodTypeOptions.map((periodType, index) => (
                      <option value={periodType.value} key={periodType.value} >
                        {t(periodType.label)}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="basePeriodBeginsDatetime">
                    {t('Base Period Begins')}{t('(Optional)')}
                  </Label>
                  <Datetime id='basePeriodBeginsDatetime'
                    value={basePeriodBeginsDatetime}
                    inputProps={{ disabled: basePeriodBeginsDatetimeDisabled }}
                    onChange={onBasePeriodBeginsDatetimeChange}
                    isValidDate={getValidBasePeriodBeginsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="basePeriodEndsDatetime">
                    {t('Base Period Ends')}{t('(Optional)')}
                  </Label>
                  <Datetime id='basePeriodEndsDatetime'
                    value={basePeriodEndsDatetime}
                    inputProps={{ disabled: basePeriodEndsDatetimeDisabled }}
                    onChange={onBasePeriodEndsDatetimeChange}
                    isValidDate={getValidBasePeriodEndsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="reportingPeriodBeginsDatetime">
                    {t('Reporting Period Begins')}
                  </Label>
                  <Datetime id='reportingPeriodBeginsDatetime'
                    value={reportingPeriodBeginsDatetime}
                    onChange={onReportingPeriodBeginsDatetimeChange}
                    isValidDate={getValidReportingPeriodBeginsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="reportingPeriodEndsDatetime">
                    {t('Reporting Period Ends')}
                  </Label>
                  <Datetime id='reportingPeriodEndsDatetime'
                    value={reportingPeriodEndsDatetime}
                    onChange={onReportingPeriodEndsDatetimeChange}
                    isValidDate={getValidReportingPeriodEndsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br></br>
                  <ButtonGroup id="submit">
                    <Button color="success" disabled={isDisabled} >{t('Submit')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title={t('Reporting Period CATEGORY Maximum Load UNIT', { 'CATEGORY': '电', 'UNIT': '(kW)' })}
          color="success" footnote={t('Per Unit Area')} footvalue={89.038 / 1000} footunit="(kW/M2)" >
          <CountUp end={89.038} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="-0.23%" title={t('Reporting Period CATEGORY Average Load UNIT', { 'CATEGORY': '电', 'UNIT': '(kW)' })}
          color="success" footnote={t('Per Unit Area')} footvalue={63.101 / 1000} footunit="(kW/M2)" >
          <CountUp end={63.101} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="-0.23%" title={t('Reporting Period CATEGORY Load Factor', { 'CATEGORY': '电' })}
          color="success" footnote={t('Ratio of Average Load to Maximum Load')}  >
          <CountUp end={0.702} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('Reporting Period CATEGORY Maximum Load UNIT', { 'CATEGORY': '自来水', 'UNIT': '(M3/h)' })}
          color="info" footnote={t('Per Unit Area')} footvalue={39.088 / 1000} footunit="(M3/M2)">
          <CountUp end={39.088} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('Reporting Period CATEGORY Average Load UNIT', { 'CATEGORY': '自来水', 'UNIT': '(M3/h)' })}
          color="info" footnote={t('Per Unit Area')} footvalue={28.088 / 1000} footunit="(M3/h/M2)">
          <CountUp end={28.088} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('Reporting Period CATEGORY Load Factor', { 'CATEGORY': '自来水' })}
          color="info" footnote={t('Ratio of Average Load to Maximum Load')} >
          <CountUp end={0.708} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('Reporting Period CATEGORY Maximum Load UNIT', { 'CATEGORY': '天然气', 'UNIT': '(M3/h)' })}
          color="warning" footnote={t('Per Unit Area')} footvalue={12.031 / 1000} footunit="(M3/h/M2)">
          <CountUp end={12.031} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('Reporting Period CATEGORY Average Load UNIT', { 'CATEGORY': '天然气', 'UNIT': '(M3/h)' })}
          color="warning" footnote={t('Per Unit Area')} footvalue={8.131 / 1000} footunit="(M3/h/M2)">
          <CountUp end={8.131} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('Reporting Period CATEGORY Load Factor', { 'CATEGORY': '天然气' })} color="warning"
          footnote={t('Ratio of Average Load to Maximum Load')} >
          <CountUp end={12.031} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title={t('Reporting Period CATEGORY Maximum Load UNIT', { 'CATEGORY': '冷', 'UNIT': '(kW)' })}
          color="success" footnote={t('Per Unit Area')} footvalue={89.038 / 1000} footunit="(kW/M2)" >
          <CountUp end={89.038} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="-0.23%" title={t('Reporting Period CATEGORY Average Load UNIT', { 'CATEGORY': '冷', 'UNIT': '(kW)' })}
          color="success" footnote={t('Per Unit Area')} footvalue={63.101 / 1000} footunit="(kW/M2)" >
          <CountUp end={63.101} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="-0.23%" title={t('Reporting Period CATEGORY Load Factor', { 'CATEGORY': '冷' })}
          color="success" footnote={t('Ratio of Average Load to Maximum Load')}  >
          <CountUp end={0.702} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <LineChart reportingTitle={t('Reporting Period CATEGORY Average Load VALUE UNIT', { 'CATEGORY': '电', 'VALUE': 7.139, 'UNIT': '(kW)' })}
        baseTitle={t('Base Period CATEGORY Average Load VALUE UNIT', { 'CATEGORY': '电', 'VALUE': 6.848, 'UNIT': '(kW)' })}
        labels={shopfloorLineChartLabels}
        data={shopfloorLineChartData}
        options={shopfloorLineChartOptions}>
      </LineChart>

      <LineChart reportingTitle={t('Related Parameters')}
        baseTitle=''
        labels={parameterLineChartLabels}
        data={parameterLineChartData}
        options={parameterLineChartOptions}>
      </LineChart>
      <br />
      <DetailedDataTable data={detailedDataTableData} title={t('Detailed Data')} columns={detailedDataTableColumns} pagesize={31} >
      </DetailedDataTable>

    </Fragment>
  );
};

export default withTranslation()(withRedirect(ShopfloorLoad));
