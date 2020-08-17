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
  FormGroup,
  Input,
  Label,
  CustomInput
} from 'reactstrap';
import CountUp from 'react-countup';
import Datetime from 'react-datetime';
import loadable from '@loadable/component';
import Cascader from 'rc-cascader';
import CardSummary from '../common/CardSummary';
import LineChart from '../common/LineChart';
import SharePie from '../common/SharePie';
import { withTranslation } from 'react-i18next';


const DetailedDataTable = loadable(() => import('./DetailedDataTable'));

const EnergyLoss = ({ t }) => {
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [meter, setMeter] = useState(undefined);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(null);
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(null);
  const [periodType, setPeriodType] = useState('hourly');

  const cascaderOptions = [{
    label: '低压柜主进线#1',
    value: 1,
    children: [{
      label: '14027320',
      value: 2,
      children: [{
        label: '14028183',
        value: 9,
      }, {
        label: '14028206',
        value: 10,
      }, {
        label: '18050545',
        value: 11,
      }],
    }, {
      label: '13071661',
      value: 3,
      children: [{
        label: '14027767',
        value: 12,
      }, {
        label: '14050015',
        value: 13,
      }]
    }, {
      label: '11AL1',
      value: 4,
      children: [{
        label: '11W11',
        value: 5,
      }, {
        label: '11W12',
        value: 6,
        children: [{
          label: '11W121',
          value: 7,
        }, {
          label: '11W122',
          value: 8,
        }
        ]
      }]
    }],
  }];

  const periodTypeOptions = [
    { value: 'yearly', label: 'Yearly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'daily', label: 'Daily' },
    { value: 'hourly', label: 'Hourly' }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const meterLineChartLabels = [
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

  const meterLineChartData = {
    a: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };


  const meterLineChartOptions = [
    { value: 'a', label: '电' },
    { value: 'b', label: '吨标准煤' },
    { value: 'c', label: '二氧化碳排放' }];

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
    a: [40, 31, 36, 32, 27, 32, 34, 26, 25, 24, 25, 30],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    e: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };

  const parameterLineChartOptions = [
    { value: 'a', label: '室外温度' },
    { value: 'b', label: '相对湿度' },
    { value: 'c', label: '电费率' },
    { value: 'd', label: '自来水费率' },
    { value: 'e', label: '天然气费率' }];

  const detailedDataTableData = [
    {
      id: 1,
      startdatetime: '2020-07-01',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 2,
      startdatetime: '2020-07-02',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 3,
      startdatetime: '2020-07-03',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 4,
      startdatetime: '2020-07-04',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 5,
      startdatetime: '2020-07-05',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 6,
      startdatetime: '2020-07-06',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 7,
      startdatetime: '2020-07-07',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 8,
      startdatetime: '2020-07-08',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 9,
      startdatetime: '2020-07-09',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 10,
      startdatetime: '2020-07-10',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 11,
      startdatetime: '2020-07-11',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 12,
      startdatetime: '2020-07-12',
      a: 49.083,
      b: (3.382 * 0.67).toFixed(2),
      c: 3.382,
    },
    {
      id: 13,
      startdatetime: '总计',
      a: 589,
      b: 33.829 * 0.67,
      c: 33.829,
    }
  ];
  const detailedDataTableColumns = [{
    dataField: 'startdatetime',
    text: '日期时间',
    sort: true
  }, {
    dataField: 'a',
    text: '电 (kWh)',
    sort: true
  }, {
    dataField: 'b',
    text: '吨标准煤 (TCE)',
    sort: true
  }, {
    dataField: 'c',
    text: '二氧化碳排放 (T)',
    sort: true
  }];

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  useEffect(() => {

  }, []);


  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Fault Detection & Diagnostics')}</BreadcrumbItem><BreadcrumbItem active>{t('Energy Loss')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                  上游计量表
                </Label>
                <br />
                <Cascader options={cascaderOptions}
                  onChange={onCascaderChange}
                  changeOnSelect
                  expandTrigger="hover">
                  <Input
                    value={selectedSpace}
                  />
                </Cascader>
              </FormGroup>
            </Col>
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
                <Label className={labelClasses} for="periodType">
                  {t('Period Types')}
                </Label>
                <CustomInput type="select" id="periodType" name="periodType" value={periodType} onChange={({ target }) => setPeriodType(target.value)}
                >
                  {periodTypeOptions.map((periodType, index) => (
                    <option value={periodType.value} key={periodType.value}>
                      {t(periodType.label)}
                    </option>
                  ))}
                </CustomInput>
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
      <div className="card-deck">
        <CardSummary rate="-0.23%" title={t('Reporting Period Lost CATEGORY UNIT', {'CATEGORY': '电', 'UNIT': '(kWh)'})} 
        color="success" footnote="" footvalue="" footunit="" >
          <CountUp end={589} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title={t('Reporting Period Lost CATEGORY UNIT', {'CATEGORY': '吨标准煤', 'UNIT': '(TCE)'})} 
        color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={589 / 8135.56} duration={2} prefix="" separator="," decimal="." decimals={2} />
        </CardSummary>
        <CardSummary rate="+9.54%" title={t('Reporting Period Lost CATEGORY UNIT', {'CATEGORY': '二氧化碳排', 'UNIT': '(T)'})}
        color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={(589 / 8135.56) * 0.67} duration={2} prefix="" separator="," decimal="." decimals={2} />
        </CardSummary>
      </div>

      <LineChart reportingTitle={t('Reporting Period Lost CATEGORY VALUE UNIT', {'CATEGORY': '电', 'VALUE': 589, 'UNIT': '(kWh)'})}
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
      <DetailedDataTable data={detailedDataTableData} title={t('Detailed Data')} columns={detailedDataTableColumns}>
      </DetailedDataTable>

    </Fragment>
  );
};

export default withTranslation()(EnergyLoss);
