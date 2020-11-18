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
import SharePie from '../common/SharePie';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { APIBaseURL } from '../../../config';
import { periodTypeOptions } from '../common/PeriodTypeOptions';
import { comparisonTypeOptions } from '../common/ComparisonTypeOptions';


const DetailedDataTable = loadable(() => import('../common/DetailedDataTable'));

const EquipmentSaving = ({ setRedirect, setRedirectUrl, t }) => {
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
  // Query Parameters
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(undefined);
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
  //Results
  const [TCEShareData, setTCEShareData] = useState([]);
  const [CO2ShareData, setCO2ShareData] = useState([]);

  const [equipmentLineChartLabels, setEquipmentLineChartLabels] = useState([]);
  const [equipmentLineChartData, setEquipmentLineChartData] = useState({});
  const [equipmentLineChartOptions, setEquipmentLineChartOptions] = useState([]);

  const [parameterLineChartLabels, setParameterLineChartLabels] = useState([]);
  const [parameterLineChartData, setParameterLineChartData] = useState({});
  const [parameterLineChartOptions, setParameterLineChartOptions] = useState([]);

  const [detailedDataTableData, setDetailedDataTableData] = useState([]);
  const [detailedDataTableColumns, setDetailedDataTableColumns] = useState([{dataField: 'startdatetime', text: t('Datetime'), sort: true}]);

  useEffect(() => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/tree', {
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
        // get Equipments by root Space ID
        let isResponseOK = false;
        fetch(APIBaseURL + '/spaces/' + [json[0]].map(o => o.value) + '/equipments', {
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
            setEquipmentList(json[0]);
            if (json[0].length > 0) {
              setSelectedEquipment(json[0][0].value);
              setIsDisabled(false);
            } else {
              setSelectedEquipment(undefined);
              setIsDisabled(true);
            }
          } else {
            toast.error(json.description)
          }
        }).catch(err => {
          console.log(err);
        });
        // end of get Equipments by root Space ID
      } else {
        toast.error(json.description);
      }
    }).catch(err => {
      console.log(err);
    });

  }, []);
  
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  
  let onSpaceCascaderChange = (value, selectedOptions) => {
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    setSelectedSpaceID(value[value.length - 1]);

    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/' + value[value.length - 1] + '/equipments', {
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
        setEquipmentList(json[0]);
        if (json[0].length > 0) {
          setSelectedEquipment(json[0][0].value);
          setIsDisabled(false);
        } else {
          setSelectedEquipment(undefined);
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
    console.log(selectedEquipment);
    console.log(comparisonType);
    console.log(periodType);
    console.log(basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : undefined);
    console.log(basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : undefined);
    console.log(reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    console.log(reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'));

    // Reinitialize tables
    setDetailedDataTableData([]);
    
    let isResponseOK = false;
    fetch(APIBaseURL + '/reports/equipmentsaving?' +
      'equipmentid=' + selectedEquipment +
      '&periodtype=' + periodType +
      '&baseperiodstartdatetime=' + (basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
      '&baseperiodenddatetime=' + (basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
      '&reportingperiodstartdatetime=' + reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') +
      '&reportingperiodenddatetime=' + reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'), {
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
        console.log(json)
        
        setTCEShareData([
          { id: 1, value: 5890863 / 8135.56, name: '电', color: '#2c7be5' },
          { id: 2, value: 29878 / 1000, name: '自来水', color: '#27bcfd' },
          { id: 3, value: 9887 / 751.8, name: '天然气', color: '#d8e2ef' }
        ]);

        setCO2ShareData([
          { id: 1, value: (5890863 / 8135.56) * 0.67, name: '电', color: '#2c7be5' },
          { id: 2, value: (29878 / 1000) * 0.67, name: '自来水', color: '#27bcfd' },
          { id: 3, value: (9887 / 751.8) * 0.67, name: '天然气', color: '#d8e2ef' }
        ]);

        setEquipmentLineChartLabels({
          a0: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
          a1: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
          a2: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
          a3: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
        });
      
        setEquipmentLineChartData({
          a0: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
          a1: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
          a2: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
          a3: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
        });
    
        setEquipmentLineChartOptions([
          { value: 'a0', label: '电' },
          { value: 'a1', label: '自来水' },
          { value: 'a2', label: '天然气' },
          { value: 'a3', label: '二氧化碳排放' }
        ]);
      
        setParameterLineChartLabels({
          a0: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
          a1: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
          a2: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
          a3: ['2020-07-01','2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09','2020-07-10','2020-07-11','2020-07-12'],
        });
      
        setParameterLineChartData({
          a0: [40, 31, 36, 32, 27, 32, 34, 26, 25, 24, 25, 30],
          a1: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
          a2: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
          a3: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
          a4: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
        });
      
        setParameterLineChartOptions([
          { value: 'a0', label: '室外温度' },
          { value: 'a1', label: '相对湿度' },
          { value: 'a2', label: '电费率' },
          { value: 'a3', label: '自来水费率' },
          { value: 'a4', label: '天然气费率' }
        ]);
      
        setDetailedDataTableData([
          {
            id: 1,
            startdatetime: '2020-07-01',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 2,
            startdatetime: '2020-07-02',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 3,
            startdatetime: '2020-07-03',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 4,
            startdatetime: '2020-07-04',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 5,
            startdatetime: '2020-07-05',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 6,
            startdatetime: '2020-07-06',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 7,
            startdatetime: '2020-07-07',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 8,
            startdatetime: '2020-07-08',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 9,
            startdatetime: '2020-07-09',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 10,
            startdatetime: '2020-07-10',
            a0: '9872',
            a1: '3457',
            a2: '567',
            a3: '567',
          },
          {
            id: 11,
            startdatetime: t('Total'),
            a0: '98720',
            a1: '34570',
            a2: '5670',
            a3: '5670',
          }
        ]);

        setDetailedDataTableColumns([
          {
            dataField: 'startdatetime',
            text: t('Datetime'),
            sort: true
          }, {
            dataField: 'a',
            text: '节约电 (kWh)',
            sort: true
          }, {
            dataField: 'b',
            text: '节约自来水 (M3)',
            sort: true
          }, {
            dataField: 'c',
            text: '节约天然气 (M3)',
            sort: true
          }, {
            dataField: 'd',
            text: '减少二氧化碳排放 (T)',
            sort: true
          }
        ]);
      
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });
  };


  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Equipment Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Saving')}</BreadcrumbItem>
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
                  <Label className={labelClasses} for="equipmentSelect">
                    {t('Equipment')}
                  </Label>
                  <CustomInput type="select" id="equipmentSelect" name="equipmentSelect" onChange={({ target }) => setSelectedEquipment(target.value)}
                  >
                    {equipmentList.map((equipment, index) => (
                      <option value={equipment.value} key={equipment.value}>
                        {equipment.label}
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
        <CardSummary rate="-0.23%" title={t('Reporting Period Savings CATEGORY (Baseline - Actual) UNIT', { 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="success"  >
          <CountUp end={764.39} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('Reporting Period Savings CATEGORY (Baseline - Actual) UNIT', { 'CATEGORY': '自来水', 'UNIT': '(M3)' })}
          color="info" >
          <CountUp end={878} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('Reporting Period Savings CATEGORY (Baseline - Actual) UNIT', { 'CATEGORY': '天然气', 'UNIT': '(M3)' })}
          color="info" >
          <CountUp end={87} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title={t('Reporting Period Savings CATEGORY (Baseline - Actual) UNIT', { 'CATEGORY': '吨标准煤', 'UNIT': '(TCE)' })}
          color="warning" >
          <CountUp end={764.39 / 8135.56 + 87 / 751.8} duration={2} prefix="" separator="," decimal="." decimals={2} />
        </CardSummary>
        <CardSummary rate="+9.54%" title={t('Reporting Period Decreased CATEGORY (Baseline - Actual) UNIT', { 'CATEGORY': '二氧化碳排放', 'UNIT': '(T)' })}
          color="warning" >
          <CountUp end={(764.39 / 8135.56 + 87 / 751.8) * 0.67} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <Row noGutters>
        <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={TCEShareData} title={t('Ton of Standard Coal by Energy Category')} />
        </Col>
        <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={CO2ShareData} title={t('Carbon Dioxide Emissions by Energy Category')} />
        </Col>
      </Row>
      <LineChart reportingTitle={t('Reporting Period Savings CATEGORY VALUE UNIT', { 'CATEGORY': '电', 'VALUE': 764.39, 'UNIT': '(kWh)' })}
        baseTitle={t('Base Period Savings CATEGORY VALUE UNIT', { 'CATEGORY': '电', 'VALUE': 684.87, 'UNIT': '(kWh)' })}
        labels={equipmentLineChartLabels}
        data={equipmentLineChartData}
        options={equipmentLineChartOptions}>
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

export default withTranslation()(withRedirect(EquipmentSaving));
