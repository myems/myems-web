import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Card, CardBody, CardHeader, Button, InputGroup, CustomInput } from 'reactstrap';
import CountUp from 'react-countup';
import CardSummary from '../dashboard/CardSummary';
import SpaceLineChart from './SpaceLineChart';
import { toast } from 'react-toastify';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';

import loadable from '@loadable/component';
const ChildSpacesTable = loadable(() => import('./ChildSpacesTable'));

const SpaceEnergyItem = () => {
  // State
  const [isSelected, setIsSelected] = useState(false);

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
          <BreadcrumbItem>空间数据分析</BreadcrumbItem><BreadcrumbItem active>空间能耗分项分析</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="报告期总电量 (kWh)" color="success" linkText="详情" to="/space/energycategory" >
          <CountUp end={5890863} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期总自来水量 (M3)" color="info" linkText="详情" to="/space/energycategory">
          <CountUp end={29878} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期总天然气量 (M3)" color="info" linkText="详情" to="/space/energycategory">
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

export default SpaceEnergyItem;
