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
      createCookie('is_logged_in', true, 1000*60*60*8);
      createCookie('user_name', user_name, 1000*60*60*8);
      createCookie('user_uuid', user_uuid, 1000*60*60*8);
      createCookie('user_token', user_token, 1000*60*60*8);
    }
  }, []);
  // State
  const [selectedSpace, setSelectedSpace] = useState(undefined);
  const [store, setStore] = useState(undefined);
  const [equipmentIds, setEquipmentIds] = useState([]);
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

  const storeList = [
    { value: 1, label: '麦肯鸡(崇文门店)' },
    { value: 2, label: '麦肯鸡(新世界店)' },
    { value: 3, label: '麦肯鸡(祈年大街得来速店)' },
    { value: 4, label: '麦肯鸡(灯市口店)' }];

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
          <BreadcrumbItem>{t('Monitoring')}</BreadcrumbItem><BreadcrumbItem active>{t('Store Equipments')}</BreadcrumbItem>
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
                <Label className={labelClasses} for="store">
                  {t('Store')}
                </Label>
                <CustomInput type="select" id="store" name="store" value={store} onChange={({ target }) => setStore(target.value)}
                >
                  {storeList.map((store, index) => (
                    <option value={store.value} key={store.value}>
                      {store.label}
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
    </Fragment>
  );
};

export default withTranslation()(withRedirect(TenantEquipments));
