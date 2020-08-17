import React, { createRef, Fragment, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Media,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import uuid from 'uuid/v1';
import Cascader from 'rc-cascader';
import FalconCardHeader from '../../common/FalconCardHeader';
import ButtonIcon from '../../common/ButtonIcon';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Flex from '../../common/Flex';
import { getPaginationArray } from '../../../helpers/utils';
import { withTranslation } from 'react-i18next';


const nameFormatter = (dataField, { name }) => (
  <Link to="/pages/customer-details">
    <Media tag={Flex} align="center">
      <Media body className="ml-2">
        <h5 className="mb-0 fs--1">{name}</h5>
      </Media>
    </Media>
  </Link>
);

const emailFormatter = email => <a href={`mailto:${email}`}>{email}</a>;
const phoneFormatter = phone => <a href={`tel:${phone}`}>{phone}</a>;

const actionFormatter = (dataField, { id }) => (
  // Control your row with this id
  <UncontrolledDropdown>
    <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
      <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
    </DropdownToggle>
    <DropdownMenu right className="border py-2">
      <DropdownItem onClick={() => console.log('Edit: ', id)}>Edit</DropdownItem>
      <DropdownItem onClick={() => console.log('Delete: ', id)} className="text-danger">
        Delete
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const columns = [
  {
    dataField: 'name',

    text: '名称',
    headerClasses: 'border-0',
    classes: 'border-0 py-2 align-middle',
    formatter: nameFormatter,
    sort: true
  },
  {
    dataField: 'costcenter',
    headerClasses: 'border-0',
    text: '成本中心',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'space',
    headerClasses: 'border-0',
    text: '空间',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'location',
    headerClasses: 'border-0',
    text: '位置',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: 'address',
    headerClasses: 'border-0',
    text: '描述',
    classes: 'border-0 py-2 align-middle',
    sort: true
  },
  {
    dataField: '',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: actionFormatter,
    align: 'right'
  }
];

const equipments = [
  {
    id: uuid(),
    name: '锅炉#1',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/锅炉房',
    location: '设备间',
    address: '2392 Main Avenue, Penasauka, New Jersey 02139',
    joined: '30/03/2018'
  },
  {
    id: uuid(),
    name: '锅炉#2',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/锅炉房',
    location: '设备间',
    address: '2289 5th Avenue, New York, New York, 10037',
    joined: '11/07/2017'
  },
  {
    id: uuid(),
    name: '锅炉#3',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/锅炉房',
    location: '设备间',
    address: '112 Bostwick Avenue, Jersey City, New Jersey, 0730',
    joined: '05/04/2016'
  },
  {
    id: uuid(),
    name: '锅炉#4',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/锅炉房',
    location: '设备间',
    address: '3448 Ile De France St #242, Fort Wainwright, Alaska, 99703',
    joined: '05/04/2018'
  },
  {
    id: uuid(),
    name: '锅炉#5',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/锅炉房',
    location: '设备间',
    address: '659 Hannah Street, Charlotte, NC 28273',
    joined: '17/03/2016'
  },
  {
    id: uuid(),
    name: '高压制冷机CH-ZL-01',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/空调水',
    location: 'B3-L2_B1',
    address: '2298 Locust Court, Artesia, CA 90701',
    joined: '12/07/2014'
  },
  {
    id: uuid(),
    name: '高压制冷机CH-ZL-02',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/空调水',
    location: 'B3-L2_B1',
    address: '4678 Maud Street, Philadelphia, DE 19103',
    joined: '15/06/2014'
  },
  {
    id: uuid(),
    name: '高压制冷机CH-ZL-03',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/空调水',
    location: 'B3-L2_B1',
    address: '3412 Crestview Manor, Indianapolis, IN 46234',
    joined: '15/04/2015'
  },
  {
    id: uuid(),
    name: '高压制冷机CH-ZL-04',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/空调水',
    location: 'B3-L2_B1',
    address: '4895 Farnum Road, New York, NY 10004',
    joined: '15/04/2016'
  },
  {
    id: uuid(),
    name: '高压制冷机CH-ZL-05',
    costcenter: '成本中心1',
    space: '成都项目/公区商场/空调水',
    location: 'B3-L2_B1',
    address: '3291 Hillside Street, Mesa, AZ 85201',
    joined: '25/08/2016'
  },
  {
    id: uuid(),
    name: '空压机#1',
    costcenter: '成本中心1',
    space: '成都项目/动力中心/空压站',
    location: '动力中心1号楼',
    address: '162 Hillhaven Drive, Los Angeles, CA 90063',
    joined: '20/12/2016'
  },
  {
    id: uuid(),
    name: '空压机#2',
    costcenter: '成本中心1',
    space: '成都项目/动力中心/空压站',
    location: '动力中心1号楼',
    address: '2551 Ocala Street, Orlando, FL 32805',
    joined: '12/01/2015'
  },
  {
    id: uuid(),
    name: '空压机#3',
    costcenter: '成本中心1',
    space: '成都项目/动力中心/空压站',
    location: '动力中心1号楼',
    address: '13572 Kurt Mews South Merritt, IA 52491'
  },
  {
    id: uuid(),
    name: '空压机#4',
    costcenter: '成本中心1',
    space: '成都项目/动力中心/空压站',
    location: '动力中心1号楼',
    address: '91979 Kohler Place Waelchiborough, CT 41291'
  },
  {
    id: uuid(),
    name: '空压机#5',
    costcenter: '成本中心1',
    space: '成都项目/动力中心/空压站',
    location: '动力中心1号楼',
    address: '6757 Giuseppe Meadows Geraldinemouth, MO 48819-4970'
  },
  {
    id: uuid(),
    name: '注塑机#1',
    costcenter: '成本中心1',
    space: '成都项目/二期厂/空压站',
    location: '动力中心1号楼',
    address: '2327 Kaylee Mill East Citlalli, AZ 89582-3143'
  },
  {
    id: uuid(),
    name: '注塑机#2',
    costcenter: '成本中心1',
    space: '成都项目/二期厂/空压站',
    location: '动力中心1号楼',
    address: '25156 Isaac Crossing Apt. 810 Lonborough, CO 83774-5999'
  },
  {
    id: uuid(),
    name: '注塑机#3',
    costcenter: '成本中心1',
    space: '成都项目/二期厂/空压站',
    location: '动力中心1号楼',
    address: '71603 Wolff Plains Apt. 885 Johnstonton, MI 01581'
  },
  {
    id: uuid(),
    name: '注塑机#4',
    costcenter: '成本中心1',
    space: '成都项目/二期厂/空压站',
    location: '动力中心1号楼',
    address: '431 Steuber Mews Apt. 252 Germanland, AK 25882'
  },
  {
    id: uuid(),
    name: '注塑机#5',
    costcenter: '成本中心1',
    space: '成都项目/二期厂/空压站',
    location: '动力中心1号楼',
    address: '4167 Laverna Manor Marysemouth, NV 74590'
  },
  {
    id: uuid(),
    name: '清洗机#1',
    costcenter: '成本中心1',
    space: '成都项目/发动机厂',
    location: '缸体线',
    address: '829 Lavonne Valley Apt. 074 Stehrfort, RI 77914-0379'
  },
  {
    id: uuid(),
    name: '清洗机#2',
    costcenter: '成本中心1',
    space: '成都项目/发动机厂',
    location: '缸体线',
    address: '53150 Thad Squares Apt. 263 Archibaldfort, MO 00837'
  },
  {
    id: uuid(),
    name: '清洗机#3',
    costcenter: '成本中心1',
    space: '成都项目/发动机厂',
    location: '缸体线',
    address: "9198 O'Kon Harbors Morarborough, IA 75409-7383"
  },
  {
    id: uuid(),
    name: "清洗机#4",
    costcenter: '成本中心1',
    space: '成都项目/发动机厂',
    location: '缸体线',
    address: '1478 Kaitlin Haven Apt. 061 Lake Muhammadmouth, SC 35848'
  },
  {
    id: uuid(),
    name: '清洗机#5',
    costcenter: '成本中心1',
    space: '成都项目/发动机厂',
    location: '缸体线',
    address: 'Garry Brainstrow, 13572 Kurt Mews South Merritt, IA 52491'
  }
];

const options = {
  custom: true,
  sizePerPage: 12,
  totalSize: equipments.length
};

const EquipmentTracking = ({ t }) => {
  let table = createRef();
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);


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

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Equipment Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Equipment Tracking')}</BreadcrumbItem>
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
                <br></br>
                <ButtonGroup id="submit">
                  <Button color="success" >{t('Submit')}</Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mb-3">
        <FalconCardHeader title="设备列表" light={false}>
          <Fragment>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              导出
            </ButtonIcon>
          </Fragment>
        </FalconCardHeader>
        <CardBody className="p-0">
          <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => {
              const lastIndex = paginationProps.page * paginationProps.sizePerPage;
              return (
                <Fragment>
                  <div className="table-responsive">
                    <BootstrapTable
                      ref={table}
                      bootstrap4
                      keyField="id"
                      data={equipments}
                      columns={columns}
                      bordered={false}
                      classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                      rowClasses="btn-reveal-trigger border-top border-200"
                      headerClasses="bg-200 text-900 border-y border-200"
                      {...paginationTableProps}
                    />
                  </div>
                  <Row noGutters className="px-1 py-3 flex-center">
                    <Col xs="auto">
                      <Button
                        color="falcon-default"
                        size="sm"
                        onClick={handlePrevPage(paginationProps)}
                        disabled={paginationProps.page === 1}
                      >
                        <FontAwesomeIcon icon="chevron-left" />
                      </Button>
                      {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => (
                        <Button
                          color={paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'}
                          size="sm"
                          className="ml-2"
                          onClick={() => paginationProps.onPageChange(pageNo)}
                          key={pageNo}
                        >
                          {pageNo}
                        </Button>
                      ))}
                      <Button
                        color="falcon-default"
                        size="sm"
                        className="ml-2"
                        onClick={handleNextPage(paginationProps)}
                        disabled={lastIndex >= paginationProps.totalSize}
                      >
                        <FontAwesomeIcon icon="chevron-right" />
                      </Button>
                    </Col>
                  </Row>
                </Fragment>
              );
            }}
          </PaginationProvider>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(EquipmentTracking);
