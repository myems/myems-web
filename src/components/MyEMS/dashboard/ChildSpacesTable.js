import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import FalconCardHeader from '../../common/FalconCardHeader';
import ButtonIcon from '../../common/ButtonIcon';
import { Button, Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';

const childSpacesData = [
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

const ChildSpacesTable = ({t}) => {
  return (
    <Fragment>
      <Card>
        <FalconCardHeader title='子空间本月能耗' className="bg-light">
          <Fragment>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              {t('Export')}
            </ButtonIcon>
          </Fragment>
        </FalconCardHeader>
        <CardBody>
          <Row>
            <Col>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={childSpacesData}
                columns={columns}
                defaultSorted={defaultSorted}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(ChildSpacesTable);
