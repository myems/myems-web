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
import CardSummary from '../../dashboard/CardSummary';
import LineChart from '../common/LineChart';
const DetailedDataTable = loadable(() => import('./DetailedDataTable'));

const ShopfloorEfficiency = () => {
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [shopfloor, setShopfloor] = useState(undefined);
  const [baselineStartDatetime, setBaselineStartDatetime] = useState(null);
  const [baselineEndDatetime, setBaselineEndDatetime] = useState(null);
  const [reportingStartDatetime, setReportingStartDatetime] = useState(null);
  const [reportingEndDatetime, setReportingEndDatetime] = useState(null);
  const [periodType, setPeriodType] = useState('hourly');
  const [inputEnergyCategory, setInputEnergyCategory] = useState(1);
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
  
  const shopfloorList = [
    { value: 1, label: '铸造'},
    { value: 2, label: '冲压'},
    { value: 3, label: '焊接'},
    { value: 4, label: '喷涂'},
    { value: 5, label: '总装'}];

  const inputEnergyCategoryOptions = [
    { value: 1, label: '电'},
    { value: 2, label: '自来水'},
    { value: 3, label: '天然气'},];

  const outputEnergyCategoryOptions = [
    { value: 4, label: '冷'},
    { value: 5, label: '热'},
    { value: 6, label: '蒸汽'},];

  const periodTypeOptions = [
    { value: 'yearly', label: '年'},
    { value: 'monthly', label: '月'},
    { value: 'daily', label: '日'},
    { value: 'hourly', label: '时'}];

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
    a: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };

  const shopfloorLineChartOptions = [
    { value: 'a', label: '电制冷效率'},
    { value: 'b', label: '电制热效率'},
    { value: 'c', label: '天然气制蒸汽效率'}];
  
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
    { value: 'a', label: '室外温度'},
    { value: 'b', label: '相对湿度'},
    { value: 'c', label: '电费率'},
    { value: 'd', label: '自来水费率'},
    { value: 'e', label: '天然气费率'}];
  
  const  detailedDataTableData =[
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
      startdatetime: '综合',
      a: '98720',
      b: '34570',
      c: '5670',
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
    text: '效率 (kWh/kWh)',
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
          <BreadcrumbItem>车间数据分析</BreadcrumbItem><BreadcrumbItem active>车间效率分析</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                空间
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
                <Label className={labelClasses} for="shopfloor">
                车间
                </Label>
                <CustomInput type="select" id="车间" name="shopfloor" value={shopfloor} onChange={({ target }) => setShopfloor(target.value)}
                >
                  { shopfloorList.map((shopfloor, index) => (
                      <option value={shopfloor.value} key={shopfloor.value}>
                        {shopfloor.label}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col  xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="inputEnergyCategory">
                消耗能源分类
                </Label>
                <CustomInput type="select" id="inputEnergyCategory" name="inputEnergyCategory" value={inputEnergyCategory} onChange={({ target }) => setInputEnergyCategory(target.value)}
                >
                  { inputEnergyCategoryOptions.map((inputEnergyCategory, index) => (
                      <option value={inputEnergyCategory.value} key={inputEnergyCategory.value}>
                        {inputEnergyCategory.label}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col  xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="outputEnergyCategory">
                产出能源分类
                </Label>
                <CustomInput type="select" id="outputEnergyCategory" name="outputEnergyCategory" value={outputEnergyCategory} onChange={({ target }) => setOutputEnergyCategory(target.value)}
                >
                  { outputEnergyCategoryOptions.map((outputEnergyCategory, index) => (
                      <option value={outputEnergyCategory.value} key={outputEnergyCategory.value}>
                        {outputEnergyCategory.label}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="baselineStartDatetime">
                基准期开始(可选)
                </Label>
                <Datetime id='baselineStartDatetime' value={baselineStartDatetime} />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="baselineEndDatetime">
                基准期结束(可选)
                </Label>
                
                <Datetime id='baselineEndDatetime' />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingStartDatetime">
                报告期开始
                </Label>
                <Datetime id='reportingStartDatetime' />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingEndDatetime">
                报告期结束
                </Label>
                <Datetime id='reportingEndDatetime' />
              </FormGroup>
            </Col>
            <Col  xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="periodType">
                时间尺度
                </Label>
                <CustomInput type="select" id="periodType" name="periodType" value={periodType} onChange={({ target }) => setPeriodType(target.value)}
                >
                  { periodTypeOptions.map((periodType, index) => (
                      <option value={periodType.value} key={periodType.value}>
                        {periodType.label}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col  xs="auto">
              <FormGroup>
                <br></br>
                <ButtonGroup id="submit">
                  <Button color="success" >提交</Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row> 
        </CardBody>
      </Card>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="报告期总电量 (kWh)" color="success" linkText="详情" to="#" >
          <CountUp end={5890.863} duration={2} prefix="" separator="," decimals={3} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期总冷量 (kWh/kWh)" color="info" linkText="详情" to="#">
          <CountUp end={32988.833} duration={2} prefix="" separator="," decimals={3} decimal="." />
        </CardSummary>
        <CardSummary rate="+2.0%" title="报告期综合效率 (T/M3)" color="warning" linkText="详情" to="#">
        <CountUp end={5.609} duration={2} prefix="" separator="," decimals={3} decimal="." />
        </CardSummary>
      </div>
      <LineChart reportingTitle='报告期电制冷效率 5.609 (kWh/kWh)' 
        baselineTitle='基准期电制冷效率 4.321 (kWh/kWh)' 
        labels={shopfloorLineChartLabels} 
        data={shopfloorLineChartData}
        options={shopfloorLineChartOptions}>
      </LineChart>
      <LineChart reportingTitle='相关参数' 
        baselineTitle='' 
        labels={parameterLineChartLabels} 
        data={parameterLineChartData}
        options={parameterLineChartOptions}>
      </LineChart>
      <br />
      <DetailedDataTable data={detailedDataTableData} title='详细数据' columns={detailedDataTableColumns}>
      </DetailedDataTable>
      
    </Fragment>
  );
};

export default ShopfloorEfficiency;
