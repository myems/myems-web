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

const VirtualMeterCost = ({ setRedirect, setRedirectUrl, t }) => {
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
  //Query From
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);
  const [virtualMeterList, setVirtualMeterList] = useState([]);
  const [selectedVirtualMeter, setSelectedVirtualMeter] = useState(undefined);
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
  const [virtualMeterEnergyCategory, setVirtualMeterEnergyCategory] = useState({ 'name': '', 'unit': '' });
  const [reportingPeriodEnergyCostInCategory, setReportingPeriodEnergyCostInCategory] = useState(0);
  const [reportingPeriodEnergyCostRate, setReportingPeriodEnergyCostRate] = useState('');
  const [reportingPeriodEnergyConsumptionInTCE, setReportingPeriodEnergyConsumptionInTCE] = useState(0);
  const [reportingPeriodEnergyConsumptionInCO2, setReportingPeriodEnergyConsumptionInCO2] = useState(0);
  const [basePeriodEnergyCostInCategory, setBasePeriodEnergyCostInCategory] = useState(0);
  const [virtualMeterLineChartOptions, setVirtualMeterLineChartOptions] = useState([]);
  const [virtualMeterLineChartData, setVirtualMeterLineChartData] = useState({});
  const [virtualMeterLineChartLabels, setVirtualMeterLineChartLabels] = useState([]);
  const [parameterLineChartOptions, setParameterLineChartOptions] = useState([]);
  const [parameterLineChartData, setParameterLineChartData] = useState({});
  const [parameterLineChartLabels, setParameterLineChartLabels] = useState([]);
  const [detailedDataTableColumns, setDetailedDataTableColumns] = useState([{dataField: 'startdatetime', text: t('Datetime'), sort: true}]);
  const [detailedDataTableData, setDetailedDataTableData] = useState([]);


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
        // get Virtual Meters by root Space ID
        let isResponseOK = false;
        fetch(baseURL + '/spaces/' + [json[0]].map(o => o.value) + '/virtualmeters', {
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
            setVirtualMeterList(json[0]);
            if (json[0].length > 0) {
              setSelectedVirtualMeter(json[0][0].value);
              setIsDisabled(false);
            } else {
              setSelectedVirtualMeter(undefined);
              setIsDisabled(true);
            }
          } else {
            toast.error(json.description)
          }
        }).catch(err => {
          console.log(err);
        });
        // end of get Virtual Meters by root Space ID
      } else {
        toast.error(json.description);
      }
    }).catch(err => {
      console.log(err);
    });

  }, [t, ]);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';


  let onSpaceCascaderChange = (value, selectedOptions) => {
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    setSelectedSpaceID(value[value.length - 1]);

    let isResponseOK = false;
    fetch(baseURL + '/spaces/' + value[value.length - 1] + '/virtualmeters', {
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
        setVirtualMeterList(json[0]);
        if (json[0].length > 0) {
          setSelectedVirtualMeter(json[0][0].value);
          setIsDisabled(false);
        } else {
          setSelectedVirtualMeter(undefined);
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
    console.log(selectedVirtualMeter);
    console.log(comparisonType);
    console.log(periodType);
    console.log(basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : undefined);
    console.log(basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : undefined);
    console.log(reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    console.log(reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'));

    let isResponseOK = false;
    fetch(baseURL + '/reports/virtualmetercost?' +
      'virtualmeterid=' + selectedVirtualMeter +
      '&periodtype=' + periodType +
      '&baseperiodbeginsdatetime=' + (basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
      '&baseperiodendsdatetime=' + (basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
      '&reportingperiodbeginsdatetime=' + reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') +
      '&reportingperiodendsdatetime=' + reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'), {
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
        setVirtualMeterEnergyCategory({
          'name': json['virtual_meter']['energy_category_name'],
          'unit': json['virtual_meter']['unit_of_measure']
        });
        setReportingPeriodEnergyCostRate(parseFloat(json['reporting_period']['increment_rate']*100).toFixed(2) + "%");
        setReportingPeriodEnergyCostInCategory(json['reporting_period']['total_in_category']);
        setReportingPeriodEnergyConsumptionInTCE(json['reporting_period']['total_in_kgce'] / 1000);
        setReportingPeriodEnergyConsumptionInCO2(json['reporting_period']['total_in_kgco2e'] / 1000);
        setBasePeriodEnergyCostInCategory(json['base_period']['total_in_category']);

        let names = Array();
        [json['virtual_meter']['energy_category_name'], '吨标准煤', '二氧化碳排放'].forEach((currentValue, index) => {
          names.push({ 'value': 'a' + index, 'label': currentValue });
        });
        setVirtualMeterLineChartOptions(names);

        let timestamps = {}
        json['reporting_period']['timestamps'].forEach((currentValue, index) => {
          timestamps['a' + index] = currentValue;
        });
        setVirtualMeterLineChartLabels(timestamps);

        let values = {'a0':[], 'a1':[], 'a2':[]}
        json['reporting_period']['values'][2].forEach((currentValue, index) => {
          values['a0'][index] = currentValue.toFixed(2);
        });
        json['reporting_period']['values'][1].forEach((currentValue, index) => {
          values['a1'][index] = (currentValue / 1000).toFixed(2);
        });
        json['reporting_period']['values'][2].forEach((currentValue, index) => {
          values['a2'][index] = (currentValue / 1000).toFixed(2);
        });
        setVirtualMeterLineChartData(values)

        names = Array();
        json['parameters']['names'].forEach((currentValue, index) => {
          names.push({ 'value': 'a' + index, 'label': currentValue });
        });
        setParameterLineChartOptions(names);

        timestamps = {}
        json['parameters']['timestamps'].forEach((currentValue, index) => {
          timestamps['a' + index] = currentValue;
        });
        setParameterLineChartLabels(timestamps);

        values = {}
        json['parameters']['values'].forEach((currentValue, index) => {
          values['a' + index] = currentValue;
        });
        setParameterLineChartData(values);

        setDetailedDataTableColumns([{
          dataField: 'startdatetime',
          text: t('Datetime'),
          sort: true
        }, {
          dataField: 'a0',
          text: json['virtual_meter']['energy_category_name'] + ' (' + json['virtual_meter']['unit_of_measure'] + ')',
          sort: true
        }, {
          dataField: 'a1',
          text: '吨标准煤 (TCE)',
          sort: true
        }, {
          dataField: 'a2',
          text: '二氧化碳排放 (T)',
          sort: true
        }]);

        let detial_value_list = [];

        json['reporting_period']['timestamps'].forEach((currentValue, index) => {
          let detial_value = {};
          detial_value['id'] = index;
          detial_value['startdatetime'] = currentValue;
          detial_value['a0'] = json['reporting_period']['values'][0][index].toFixed(2);
          detial_value['a1'] = (json['reporting_period']['values'][1][index] / 1000).toFixed(2);
          detial_value['a2'] = (json['reporting_period']['values'][2][index] / 1000).toFixed(2);
          detial_value_list.push(detial_value);
        });
        let detial_value = {};
        detial_value['id'] = detial_value_list.length;
        detial_value['startdatetime'] = t('Total');
        detial_value['a0'] = json['reporting_period']['total_in_category'].toFixed(2);
        detial_value['a1'] = (json['reporting_period']['total_in_kgce'] / 1000).toFixed(2);
        detial_value['a2'] = (json['reporting_period']['total_in_kgco2e'] / 1000).toFixed(2);
        detial_value_list.push(detial_value);
        setDetailedDataTableData(detial_value_list);

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
          <BreadcrumbItem>{t('Meter Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Virtual Meter Cost')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form >
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
                  <Label className={labelClasses} for="virtualMeterSelect">
                    {t('Virtual Meter')}
                  </Label>
                  <CustomInput type="select" id="virtualMeterSelect" name="virtualMeterSelect" onChange={({ target }) => setSelectedVirtualMeter(target.value)}
                  >
                    {virtualMeterList.map((virtualMeter, index) => (
                      <option value={virtualMeter.value} key={virtualMeter.value}>
                        {virtualMeter.label}
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
        <CardSummary rate={reportingPeriodEnergyCostRate} title={t('Reporting Period Costs CATEGORY UNIT', { 'CATEGORY': virtualMeterEnergyCategory['name'], 'UNIT': '(' + virtualMeterEnergyCategory['unit'] + ')' })}
          color="success"  >
          <CountUp end={reportingPeriodEnergyCostInCategory} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate={reportingPeriodEnergyCostRate} title={t('Reporting Period Consumption CATEGORY UNIT', { 'CATEGORY': '吨标准煤', 'UNIT': '(TCE)' })}
          color="warning" >
          <CountUp end={reportingPeriodEnergyConsumptionInTCE} duration={2} prefix="" separator="," decimal="." decimals={2} />
        </CardSummary>
        <CardSummary rate={reportingPeriodEnergyCostRate} title={t('Reporting Period Consumption CATEGORY UNIT', { 'CATEGORY': '二氧化碳排放', 'UNIT': '(T)' })}
          color="warning" >
          <CountUp end={reportingPeriodEnergyConsumptionInCO2} duration={2} prefix="" separator="," decimal="." decimals={2} />
        </CardSummary>
      </div>

      <LineChart reportingTitle={t('Reporting Period Costs CATEGORY VALUE UNIT', { 'CATEGORY': virtualMeterEnergyCategory['name'], 'VALUE': reportingPeriodEnergyCostInCategory.toFixed(2), 'UNIT': '(' + virtualMeterEnergyCategory['unit'] + ')' })}
        baseTitle={t('Base Period Costs CATEGORY VALUE UNIT', { 'CATEGORY': virtualMeterEnergyCategory['name'], 'VALUE': basePeriodEnergyCostInCategory.toFixed(2), 'UNIT': '(' + virtualMeterEnergyCategory['unit'] + ')' })}
        labels={virtualMeterLineChartLabels}
        data={virtualMeterLineChartData}
        options={virtualMeterLineChartOptions}>
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

export default withTranslation()(withRedirect(VirtualMeterCost));
