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
import { withTranslation } from 'react-i18next';

const DetailedDataTable = loadable(() => import('./DetailedDataTable'));

const CombinedEquipmentEfficiency = ({ t }) => {
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [combinedEquipment, setCombinedEquipment] = useState(undefined);
  const [basePeriodBeginsDatetime, setBasePeriodBeginsDatetime] = useState(null);
  const [basePeriodEndsDatetime, setBasePeriodEndsDatetime] = useState(null);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(null);
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(null);
  const [periodType, setPeriodType] = useState('hourly');
  const [fractionParameter, setFractionParameter] = useState(1);
  const [outputEnergyCategory, setOutputEnergyCategory] = useState(4);

  const cascaderOptions = [{
    label: '成都项目',
    value: 1,
    children: [{
      label: '租区',
      value: 2,
      children: [{
        label: '大租户',
        value: 9,
      }, {
        label: '餐饮租户',
        value: 10,
      }, {
        label: '零售租户',
        value: 11,
      }],
    }, {
      label: '公区商场',
      value: 3,
      children: [{
        label: '给排水',
        value: 12,
      }, {
        label: '扶梯直梯',
        value: 13,
      }, {
        label: '照明及插座',
        value: 14,
      }, {
        label: '空调水',
        value: 15,
      }, {
        label: '空调风',
        value: 16,
      }, {
        label: '特殊功能房间',
        value: 17,
      }, {
        label: '其他用电设备',
        value: 18,
      }]
    }, {
      label: '公区车库',
      value: 4,
      children: [{
        label: '车库通风',
        value: 5,
      }, {
        label: '车库照明',
        value: 6,
        children: [{
          label: '应急照明',
          value: 7,
        }, {
          label: '普通照明',
          value: 8,
        }
        ]
      }]
    }],
  }];

  const combinedEquipmentList = [
    { value: 1, label: '冷站' },
    { value: 2, label: '锅炉房' }];

  const fractionParameterOptions = [
    { value: 1, label: '综合能效比EER' },];

  const periodTypeOptions = [
    { value: 'yearly', label: 'Yearly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'daily', label: 'Daily' },
    { value: 'hourly', label: 'Hourly' }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const equipmentLineChartLabels = [
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

  const equipmentLineChartData = {
    a: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };

  const equipmentLineChartOptions = [
    { value: 'a', label: '电制冷效率' },];

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
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 2,
      startdatetime: '2020-07-02',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 3,
      startdatetime: '2020-07-03',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 4,
      startdatetime: '2020-07-04',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 5,
      startdatetime: '2020-07-05',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 6,
      startdatetime: '2020-07-06',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 7,
      startdatetime: '2020-07-07',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 8,
      startdatetime: '2020-07-08',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 9,
      startdatetime: '2020-07-09',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 10,
      startdatetime: '2020-07-10',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 11,
      startdatetime: '2020-07-11',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 12,
      startdatetime: '2020-07-12',
      a: '9872',
      b: '55975',
      c: '5.67',
    },
    {
      id: 13,
      startdatetime: '综合',
      a: '118464',
      b: '671700',
      c: '5.67',
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
    text: '冷 (kWh)',
    sort: true
  }, {
    dataField: 'c',
    text: '综合能效比EER (kWh/kWh)',
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
          <BreadcrumbItem>{t('Combined Equipment Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Efficiency')}</BreadcrumbItem>
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
                  <Input
                    value={selectedSpace}
                  />
                </Cascader>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="combinedEquipment">
                  {t('Combined Equipment')}
                </Label>
                <CustomInput type="select" id="combinedEquipment" name="combinedEquipment" value={combinedEquipment} onChange={({ target }) => setCombinedEquipment(target.value)}
                >
                  {combinedEquipmentList.map((combinedEquipment, index) => (
                    <option value={combinedEquipment.value} key={combinedEquipment.value}>
                      {combinedEquipment.label}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="fractionParameter">
                  效率参数(分式参数)
                </Label>
                <CustomInput type="select" id="fractionParameter" name="fractionParameter" value={fractionParameter} onChange={({ target }) => setFractionParameter(target.value)}
                >
                  {fractionParameterOptions.map((fractionParameter, index) => (
                    <option value={fractionParameter.value} key={fractionParameter.value}>
                      {fractionParameter.label}
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
                <Datetime id='basePeriodBeginsDatetime' value={basePeriodBeginsDatetime} />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="basePeriodEndsDatetime">
                  {t('Base Period Ends')}{t('(Optional)')}
                </Label>

                <Datetime id='basePeriodEndsDatetime' />
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
        <CardSummary rate="0.0%" title={t('COMBINED_EQUIPMENT Reporting Period CATEGORY Output UNIT', { 'COMBINED_EQUIPMENT': '冷站', 'CATEGORY': '冷', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('COMBINED_EQUIPMENT Reporting Period CATEGORY Input UNIT', { 'COMBINED_EQUIPMENT': '冷站', 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={5880.36} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title={t('COMBINED_EQUIPMENT Reporting Period Cumulative Comprehensive Efficiency UNIT', { 'COMBINED_EQUIPMENT': '冷站', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 5880.36} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('COMBINED_EQUIPMENT Instantaneous Comprehensive Efficiency UNIT', { 'COMBINED_EQUIPMENT': '冷站', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 5880.36 + 1} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Output UNIT', { 'EQUIPMENT': '冷机#1', 'CATEGORY': '冷', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={12988.833} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Input UNIT', { 'EQUIPMENT': '冷机#1', 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={2000} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title={t('EQUIPMENT Reporting Period Cumulative Efficiency UNIT', { 'EQUIPMENT': '冷机#1', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={12988.833 / 2000} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Instantaneous Efficiency UNIT', { 'EQUIPMENT': '冷机#1', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={12988.833 / 2000 + 1} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Output UNIT', { 'EQUIPMENT': '冷机#2', 'CATEGORY': '冷', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={22988.833} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Input UNIT', { 'EQUIPMENT': '冷机#2', 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={3000} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title={t('EQUIPMENT Reporting Period Cumulative Efficiency UNIT', { 'EQUIPMENT': '冷机#2', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={22988.833 / 3000} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Instantaneous Efficiency UNIT', { 'EQUIPMENT': '冷机#2', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={22988.833 / 3000 + 1} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Output UNIT', { 'EQUIPMENT': '冷冻泵', 'CATEGORY': '冷', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Input UNIT', { 'EQUIPMENT': '冷冻泵', 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={200} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title={t('EQUIPMENT Reporting Period Cumulative Efficiency UNIT', { 'EQUIPMENT': '冷冻泵', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 200} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Instantaneous Efficiency UNIT', { 'EQUIPMENT': '冷冻泵', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 200 + 1} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Output UNIT', { 'EQUIPMENT': '冷却泵', 'CATEGORY': '冷', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Input UNIT', { 'EQUIPMENT': '冷却泵', 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={300} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title={t('EQUIPMENT Reporting Period Cumulative Efficiency UNIT', { 'EQUIPMENT': '冷却泵', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 300} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Instantaneous Efficiency UNIT', { 'EQUIPMENT': '冷却泵', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 300 + 1} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Output UNIT', { 'EQUIPMENT': '冷却塔', 'CATEGORY': '冷', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Reporting Period CATEGORY Input UNIT', { 'EQUIPMENT': '冷却塔', 'CATEGORY': '电', 'UNIT': '(kWh)' })}
          color="info" footnote="" footvalue="" footunit="">
          <CountUp end={380.36} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title={t('EQUIPMENT Reporting Period Cumulative Efficiency UNIT', { 'EQUIPMENT': '冷却塔', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 380.36} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title={t('EQUIPMENT Instantaneous Efficiency UNIT', { 'EQUIPMENT': '冷却塔', 'UNIT': '(kWh/kWh)' })}
          color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={32988.833 / 380.36 + 1} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <LineChart reportingTitle={t('COMBINED_EQUIPMENT Reporting Period Cumulative Comprehensive Efficiency VALUE UNIT', { 'COMBINED_EQUIPMENT': '冷站', 'VALUE': 5.609, 'UNIT': '(kWh/kWh)' })}
        baseTitle={t('COMBINED_EQUIPMENT Base Period Cumulative Comprehensive Efficiency VALUE UNIT', { 'COMBINED_EQUIPMENT': '冷站', 'VALUE': 4.321, 'UNIT': '(kWh/kWh)' })}
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
      <DetailedDataTable data={detailedDataTableData} title={t('Detailed Data')} columns={detailedDataTableColumns}>
      </DetailedDataTable>

    </Fragment>
  );
};

export default withTranslation()(CombinedEquipmentEfficiency);
