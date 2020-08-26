import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  CustomInput,
  Row,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import Loader from '../../common/Loader';
import useFakeFetch from '../../../hooks/useFakeFetch';
import { isIterableArray } from '../../../helpers/utils';
import Flex from '../../common/Flex';
import Cascader from 'rc-cascader';
import classNames from 'classnames';
import EquipmentList from './EquipmentList';
import EquipmentFooter from './EquipmentFooter';
import usePagination from '../../../hooks/usePagination';
import equipments from './equipments';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { cascaderOptions } from '../common/cascaderOptions';


const TenantEquipments = ({ setRedirect, setRedirectUrl, t }) => {
  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_uuid = getCookieValue('user_uuid');
    let user_token = getCookieValue('user_token');
    if (is_logged_in === null || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, 1000 * 60 * 60 * 8);
      createCookie('user_name', user_name, 1000 * 60 * 60 * 8);
      createCookie('user_uuid', user_uuid, 1000 * 60 * 60 * 8);
      createCookie('user_token', user_token, 1000 * 60 * 60 * 8);
    }
  }, []);
  // State
  const [selectedSpace, setSelectedSpace] = useState(undefined);
  const [tenant, setTenant] = useState(undefined);
  const [equipmentIds, setEquipmentIds] = useState([]);
  

  const tenantList = [
    { value: 1, label: '海上捞火锅(北京王府井店)' },
    { value: 2, label: 'Longines浪琴' },
    { value: 3, label: 'Starbucks星巴克' },
    { value: 4, label: 'Versace/范思哲' }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }
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
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Monitoring')}</BreadcrumbItem><BreadcrumbItem active>{t('Tenant Equipments')}</BreadcrumbItem>
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
                <Label className={labelClasses} for="tenant">
                  {t('Tenant')}
                </Label>
                <CustomInput type="select" id="tenant" name="tenant" value={tenant} onChange={({ target }) => setTenant(target.value)}
                >
                  {tenantList.map((tenant, index) => (
                    <option value={tenant.value} key={tenant.value}>
                      {tenant.label}
                    </option>
                  ))}
                </CustomInput>
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


      <Card>
        <CardBody className={classNames({ 'p-0  overflow-hidden': isList, 'pb-0': isGrid })}>
          {loading ? (
            <Loader />
          ) : (
              <Row noGutters={isList}>
                {isIterableArray(equipments) &&
                  equipments
                    .filter(equipment => paginationData.includes(equipment.id))
                    .map((equipment, index) => <EquipmentList {...equipment} sliderSettings={sliderSettings} key={equipment.id} index={index} />)}
              </Row>
            )}
        </CardBody>
        <EquipmentFooter meta={paginationMeta} handler={paginationHandler} />
      </Card>
      <Card className="mb-3">
        <CardBody>
          <Row className="justify-content-between align-items-center">
            <Col sm="auto" className="mb-2 mb-sm-0" tag={Flex} align="center">
              <h6 className="mb-0 text-nowrap ml-2">
                {t('Show Up to')}
              </h6>
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
                <option value={total}>{t('All')}</option>
              </CustomInput>
              <h6 className="mb-0 text-nowrap ml-2">
                {t('FROM - TO of TOTAL Equipments', { 'FROM': from, 'TO': to, 'TOTAL': total })}
              </h6>
            </Col>

          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(withRedirect(TenantEquipments));
