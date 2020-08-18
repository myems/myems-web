import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import FalconCardHeader from '../../common/FalconCardHeader';
import ButtonIcon from '../../common/ButtonIcon';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';


const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const ChildSpacesTable = ({ title, data, columns, t }) => {
  return (
    <Fragment>
      <Card>
        <FalconCardHeader title={title} className="bg-light">
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
                data={data}
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
