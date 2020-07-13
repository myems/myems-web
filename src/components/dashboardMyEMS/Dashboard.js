import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroup, CustomInput } from 'reactstrap';
import CountUp from 'react-countup';
import CardSummary from '../dashboard/CardSummary';
import ActiveUsersBarChart from '../dashboard/ActiveUsersBarChart';
import PaymentsLineChart from '../dashboard/PaymentsLineChart';
import { toast } from 'react-toastify';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';

import loadable from '@loadable/component';
import DashBoardDepositStatus from '../dashboard/DashboardDepositStatus';
const PurchasesTable = loadable(() => import('../dashboard/PurchasesTable'));
const ActiveUsersMap = loadable(() => import('../dashboard/ActiveUsersMap'));

const Dashboard = () => {
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
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="本年总电量 (kWh)" color="success" linkText="详情" to="/space/energycategory" >
          <CountUp end={5890863} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="本年总自来水量 (M3)" color="info" linkText="详情" to="/space/energycategory">
          <CountUp end={29878} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="本年总天然气量 (M3)" color="info" linkText="详情" to="/space/energycategory">
        <CountUp end={9887} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title="本年总二氧化碳排放量 (T)" color="warning" linkText="详情" to="/space/energycategory">
          <CountUp end={43594} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="本年总电费 (RMB)" color="success" linkText="详情" to="/space/cost">
          <CountUp end={5890863} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="本年总自来水费 (RMB)" color="info" linkText="详情" to="/space/cost">
          <CountUp end={29878} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title="本年总天然气费 (RMB)" color="warning" linkText="详情" to="/space/cost">
          <CountUp end={43594} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
      </div>
      <PaymentsLineChart />
      <DashBoardDepositStatus />
      <Card className="mb-3">
        <FalconCardHeader title="Recent Purchases" light={false}>
          {isSelected ? (
            <InputGroup size="sm" className="input-group input-group-sm">
              <CustomInput type="select" id="bulk-select">
                <option>Bulk actions</option>
                <option value="Refund">Refund</option>
                <option value="Delete">Delete</option>
                <option value="Archive">Archive</option>
              </CustomInput>
              <Button color="falcon-default" size="sm" className="ml-2">
                Apply
              </Button>
            </InputGroup>
          ) : (
            <Fragment>
              <ButtonIcon icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
                New
              </ButtonIcon>
              <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
                Filter
              </ButtonIcon>
              <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
                Export
              </ButtonIcon>
            </Fragment>
          )}
        </FalconCardHeader>
        <CardBody className="p-0">
          <PurchasesTable setIsSelected={setIsSelected} />
        </CardBody>
      </Card>
      <Row noGutters>
        <Col lg="4" className="pr-lg-2">
          <ActiveUsersBarChart />
        </Col>
        <Col lg="8" className="pl-lg-2">
          <ActiveUsersMap />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
