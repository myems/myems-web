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

const MeterTrend = ({ setRedirect, setRedirectUrl, t }) => {
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
  const [meterList, setMeterList] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState(undefined);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(current_moment.clone().startOf('month'));
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(current_moment);
  const [cascaderOptions, setCascaderOptions] = useState(undefined);
  const [isDisabled, setIsDisabled] = useState(true);
  //Results
  const [meterEnergyCategory, setMeterEnergyCategory] = useState({ 'name': '', 'unit': '' });
  const [reportingPeriodEnergyConsumptionInCategory, setReportingPeriodEnergyConsumptionInCategory] = useState(0);
  const [reportingPeriodEnergyConsumptionRate, setReportingPeriodEnergyConsumptionRate] = useState('');
  const [reportingPeriodEnergyConsumptionInTCE, setReportingPeriodEnergyConsumptionInTCE] = useState(0);
  const [reportingPeriodEnergyConsumptionInCO2, setReportingPeriodEnergyConsumptionInCO2] = useState(0);
  const [meterLineChartOptions, setMeterLineChartOptions] = useState([]);
  const [meterLineChartData, setMeterLineChartData] = useState({});
  const [meterLineChartLabels, setMeterLineChartLabels] = useState([]);
  const [parameterLineChartOptions, setParameterLineChartOptions] = useState([]);
  const [parameterLineChartData, setParameterLineChartData] = useState({});
  const [parameterLineChartLabels, setParameterLineChartLabels] = useState([]);
  const [detailedDataTableColumns, setDetailedDataTableColumns] = useState([]);
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
        // get Meters by root Space ID
        let isResponseOK = false;
        fetch(baseURL + '/spaces/' + [json[0]].map(o => o.value) + '/meters', {
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
            setMeterList(json[0]);
            if (json[0].length > 0) {
              setSelectedMeter(json[0][0].value);
              setIsDisabled(false);
            } else {
              setSelectedMeter(undefined);
              setIsDisabled(true);
            }
          } else {
            toast.error(json.description)
          }
        }).catch(err => {
          console.log(err);
        });
        // end of get Meters by root Space ID
      } else {
        toast.error(json.description);
      }
    }).catch(err => {
      console.log(err);
    });

    setDetailedDataTableColumns([{
      dataField: 'startdatetime',
      text: t('Datetime'),
      sort: true
    }]);
  }, []);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';


  let onSpaceCascaderChange = (value, selectedOptions) => {
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    setSelectedSpaceID(value[value.length - 1]);

    let isResponseOK = false;
    fetch(baseURL + '/spaces/' + value[value.length - 1] + '/meters', {
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
        setMeterList(json[0]);
        if (json[0].length > 0) {
          setSelectedMeter(json[0][0].value);
          setIsDisabled(false);
        } else {
          setSelectedMeter(undefined);
          setIsDisabled(true);
        }
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });
  }


  let onReportingPeriodBeginsDatetimeChange = (newDateTime) => {
    setReportingPeriodBeginsDatetime(newDateTime);
    
  }

  let onReportingPeriodEndsDatetimeChange = (newDateTime) => {
    setReportingPeriodEndsDatetime(newDateTime);
    
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
    console.log(selectedMeter);
    console.log(reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    console.log(reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'));

    let isResponseOK = false;
    fetch(baseURL + '/reports/metertrend?' +
      'meterid=' + selectedMeter +
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
        setMeterEnergyCategory({
          'name': json['meter']['energy_category_name'],
          'unit': json['meter']['unit_of_measure']
        });
        setReportingPeriodEnergyConsumptionRate(parseFloat(json['reporting_period']['increment_rate']*100).toFixed(2) + "%");
        setReportingPeriodEnergyConsumptionInCategory(json['reporting_period']['total_in_category']);
        setReportingPeriodEnergyConsumptionInTCE(json['reporting_period']['total_in_kgce'] / 1000);
        setReportingPeriodEnergyConsumptionInCO2(json['reporting_period']['total_in_kgco2e'] / 1000);
        
        let names = Array();
        json['reporting_period']['names'].forEach((currentValue, index) => {
          names.push({ 'value': 'a' + index, 'label': currentValue });
        });
        setMeterLineChartOptions(names);

        setMeterLineChartLabels(json['reporting_period']['timestamps']);

        let values = {}
        json['reporting_period']['values'].forEach((currentValue, index) => {
          names.push({ 'value': 'a' + index, 'label': currentValue });
        });
        setMeterLineChartData(values)

        names = Array();
        json['parameters']['names'].forEach((currentValue, index) => {
          names.push({ 'value': 'a' + index, 'label': currentValue });
        });
        setParameterLineChartOptions(names);

        setParameterLineChartLabels(json['parameters']['timestamps']);

        values = {}
        json['parameters']['values'].forEach((currentValue, index) => {
          values['a' + index] = currentValue;
        });
        setParameterLineChartData(values);

        let columns = [{
          dataField: 'startdatetime',
          text: t('Datetime'),
          sort: true
        }];
        json['reporting_period']['names'].forEach((currentValue, index) => {
          let column = {};
          column['dataField'] = 'a' + index;
          column['text'] = currentValue;
          column['sort'] = true;
          columns.push(column);
        });
        setDetailedDataTableColumns(columns);

        let detial_value_list = [];
        json['reporting_period']['timestamps'].forEach((currentValue, index) => {
          let detial_value = {};
          detial_value['id'] = index;
          detial_value['startdatetime'] = currentValue;
          json['reporting_period']['names'].forEach((currentValue1, index1) => {
            detial_value['a' + index1] = json['reporting_period']['values'][index1][index];
          });
          detial_value_list.push(detial_value);
        });
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
          <BreadcrumbItem>{t('Meter Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Meter Trend')}</BreadcrumbItem>
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
                  <Label className={labelClasses} for="meterSelect">
                    {t('Meter')}
                  </Label>
                  <CustomInput type="select" id="meterSelect" name="meterSelect" onChange={({ target }) => setSelectedMeter(target.value)}
                  >
                    {meterList.map((meter, index) => (
                      <option value={meter.value} key={meter.value}>
                        {meter.label}
                      </option>
                    ))}
                  </CustomInput>
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

      <LineChart reportingTitle={t('Trend Values')}
        baseTitle
        labels={meterLineChartLabels}
        data={meterLineChartData}
        options={meterLineChartOptions}>
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

export default withTranslation()(withRedirect(MeterTrend));
