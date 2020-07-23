import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, Card, CardBody, Col, CustomInput, Form, InputGroup, Row } from 'reactstrap';
import Loader from '../../common/Loader';
import useFakeFetch from '../../../hooks/useFakeFetch';
import { isIterableArray } from '../../../helpers/utils';
import Flex from '../../common/Flex';
import classNames from 'classnames';
import EquipmentList from './EquipmentList';
import EquipmentFooter from './EquipmentFooter';
import usePagination from '../../../hooks/usePagination';
import equipments from './equipments';

const SpaceEquipments = () => {
  
  // State
  const [equipmentIds, setEquipmentIds] = useState([]);

  // Hook
  const { loading } = useFakeFetch(equipments);
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(equipmentIds, 4);
  const { total, itemsPerPage, from, to } = paginationMeta;
  const { perPage } = paginationHandler;

  const isList = true;
  const isGrid = false;
  
  useEffect(() => {
    setEquipmentIds(equipments.map(equipment => equipment.id));
  }, [equipments, setEquipmentIds]);

  return (
    <Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row className="justify-content-between align-items-center">
            <Col sm="auto" className="mb-2 mb-sm-0" tag={Flex} align="center">
              <CustomInput
                id="itemsPerPage"
                type="select"
                bsSize="sm"
                value={itemsPerPage}
                onChange={({ target }) => perPage(Number(target.value))}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={total}>All</option>
              </CustomInput>
              <h6 className="mb-0 text-nowrap ml-2">
              显示 {from}-{to}, 共{total}台设备
              </h6>
            </Col>
            
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody className={classNames({ 'p-0  overflow-hidden': isList, 'pb-0': isGrid })}>
          {loading ? (
            <Loader />
          ) : (
            <Row noGutters={isList}>
              {isIterableArray(equipments) &&
                equipments
                  .filter(equipment => paginationData.includes(equipment.id))
                  .map((equipment, index) => <EquipmentList {...equipment} key={equipment.id} index={index} />)}
            </Row>
          )}
        </CardBody>
        <EquipmentFooter meta={paginationMeta} handler={paginationHandler} />
      </Card>
    </Fragment>
  );
};

export default SpaceEquipments;
