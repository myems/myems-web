import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';


const defaultSorted = [{
  dataField: 'startdatetime',
  order: 'asc'
}];

const DetailedDataTable = ({title, data, columns}) => {
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">{title}</h4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={ data }
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

export default DetailedDataTable;
