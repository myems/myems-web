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
import CardSummary from '../dashboard/CardSummary';
import SpaceLineChart from './SpaceLineChart';
import { toast } from 'react-toastify';

import loadable from '@loadable/component';
const ChildSpacesTable = loadable(() => import('./ChildSpacesTable'));

const SpaceCost = () => {
  // State
  
  const [baselineStartDatetime, setBaselineStartDatetime] = useState(null);
  const [baselineEndDatetime, setBaselineEndDatetime] = useState(null);
  const [reportingStartDatetime, setReportingStartDatetime] = useState(null);
  const [reportingEndDatetime, setReportingEndDatetime] = useState(null);
  const [periodType, setPeriodType] = useState('hourly');
  
  const periodTypeOptions = [
    { value: 'yearly', label: '年'},
    { value: 'monthly', label: '月'},
    { value: 'daily', label: '日'},
    { value: 'hourly', label: '时'}];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';


  useEffect(() => {
    toast(
      <Fragment>
        Welcome to <strong>MyEMS</strong>!<br />
        the Leading Free and Open Source Energy Management System
      </Fragment>
    );
  }, []);

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>空间数据分析</BreadcrumbItem><BreadcrumbItem active>空间成本分析</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                空间
                </Label>
                <Input />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="baselineStartDatetime">
                基准期开始(可选)
                </Label>
                <Datetime id='baselineStartDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="baselineEndDatetime">
                基准期结束(可选)
                </Label>
                
                <Datetime id='baselineEndDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingStartDatetime">
                报告期开始
                </Label>
                <Datetime id='reportingStartDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingEndDatetime">
                报告期结束
                </Label>
                <Datetime id='reportingEndDatetime' />
              </FormGroup>
            </Col>
            <Col >
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
            <Col >
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
        <CardSummary rate="-0.23%" title="报告期总电费 (RMB)" color="success" linkText="详情" to="/space/energycategory" >
          <CountUp end={5890863} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期总自来水费 (RMB)" color="info" linkText="详情" to="/space/energycategory">
          <CountUp end={29878} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期总天然气费 (RMB)" color="info" linkText="详情" to="/space/energycategory">
        <CountUp end={9887} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title="报告期总二氧化碳排放量 (T)" color="warning" linkText="详情" to="/space/energycategory">
          <CountUp end={43594} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
      </div>
      <SpaceLineChart />
      <ChildSpacesTable />
      
    </Fragment>
  );
};

export default SpaceCost;
