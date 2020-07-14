import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import PageHeader from '../common/PageHeader';
import { Button, Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FalconEditor from '../common/FalconEditor';
const  childSpacesData =[
  {
    id: 1,
    name: '公区',
    electricity: '9872',
    water: '3457',
    naturalgas: '567',
    co2: '567',
  },
  {
    id: 2,
    name: '车库',
    electricity: '9872',
    water: '3457',
    naturalgas: '567',
    co2: '567',
  },
  {
    id: 3,
    name: '租区',
    electricity: '9872',
    water: '3457',
    naturalgas: '567',
    co2: '567',
  }
];
const columns = [{
  dataField: 'name',
  text: '子空间',
  sort: true
}, {
  dataField: 'electricity',
  text: '电 (kWh)',
  sort: true
}, {
  dataField: 'water',
  text: '自来水 (M3)',
  sort: true
}, {
  dataField: 'naturalgas',
  text: '天然气 (M3)',
  sort: true
}, {
  dataField: 'co2',
  text: '二氧化碳排放 (T)',
  sort: true
}];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const ChildSpacesTable = () => {
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">子空间本月能耗</h4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={ childSpacesData }
              columns={ columns }
              defaultSorted={ defaultSorted } 
            />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ChildSpacesTable;
