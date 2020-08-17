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
import LineChart from '../common/LineChart';
import { withTranslation } from 'react-i18next';


const DetailedDataTable = loadable(() => import('./DetailedDataTable'));

const MeterTrend = ({ t }) => {
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [meter, setMeter] = useState(undefined);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(null);
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(null);

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

  const meterList = [
    { value: 1, label: 'P3PW_D36_009' },
    { value: 2, label: '71AL6-1' },
    { value: 3, label: 'CH-CCHWS' },
    { value: 4, label: '1#冷冻泵' }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const meterLineChartLabels = [
    '2020-07-01 00:00:00AM',
    '2020-07-02 00:00:00AM',
    '2020-07-03 00:00:00AM',
    '2020-07-04 00:00:00AM',
    '2020-07-05 00:00:00AM',
    '2020-07-06 00:00:00AM',
    '2020-07-07 00:00:00AM',
    '2020-07-08 00:00:00AM',
    '2020-07-09 00:00:00AM',
    '2020-07-10 00:00:00AM',
    '2020-07-11 00:00:00AM',
    '2020-07-12 00:00:00AM'
  ];

  const meterLineChartData = {
    a: [4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 18, 19],
  };


  const meterLineChartOptions = [
    { value: 'a', label: '有功功率 (kWh)' },];

  const parameterLineChartLabels = [
    '2020-07-01 00:00:00AM',
    '2020-07-02 00:00:00AM',
    '2020-07-03 00:00:00AM',
    '2020-07-04 00:00:00AM',
    '2020-07-05 00:00:00AM',
    '2020-07-06 00:00:00AM',
    '2020-07-07 00:00:00AM',
    '2020-07-08 00:00:00AM',
    '2020-07-09 00:00:00AM',
    '2020-07-10 00:00:00AM',
    '2020-07-11 00:00:00AM',
    '2020-07-12 00:00:00AM'
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
      startdatetime: '2020-07-01 00:00:00AM',
      a: 4,
    },
    {
      id: 2,
      startdatetime: '2020-07-02 00:00:00AM',
      a: 5,
    },
    {
      id: 3,
      startdatetime: '2020-07-03 00:00:00AM',
      a: 7,
    },
    {
      id: 4,
      startdatetime: '2020-07-04 00:00:00AM',
      a: 8,
    },
    {
      id: 5,
      startdatetime: '2020-07-05 00:00:00AM',
      a: 10,
    },
    {
      id: 6,
      startdatetime: '2020-07-06 00:00:00AM',
      a: 11,
    },
    {
      id: 7,
      startdatetime: '2020-07-07 00:00:00AM',
      a: 13,
    },
    {
      id: 8,
      startdatetime: '2020-07-08 00:00:00AM',
      a: 14,
    },
    {
      id: 9,
      startdatetime: '2020-07-09 00:00:00AM',
      a: 16,
    },
    {
      id: 10,
      startdatetime: '2020-07-10 00:00:00AM',
      a: 17,
    },
    {
      id: 11,
      startdatetime: '2020-07-11 00:00:00AM',
      a: 18,
    },
    {
      id: 12,
      startdatetime: '2020-07-12 00:00:00AM',
      a: 19,
    }
  ];
  const detailedDataTableColumns = [{
    dataField: 'startdatetime',
    text: '日期时间',
    sort: true
  }, {
    dataField: 'a',
    text: '有功功率 (kWh)',
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
          <BreadcrumbItem>{t('Meter Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Meter Trend')}</BreadcrumbItem>
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
                <Label className={labelClasses} for="meter">
                  {t('Meter')}
                </Label>
                <CustomInput type="select" id="meter" name="meter" value={meter} onChange={({ target }) => setMeter(target.value)}
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

      <LineChart reportingTitle='能耗值点'
        baseTitle=''
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

export default withTranslation()(MeterTrend);
