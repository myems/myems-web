import React, { createRef, Fragment, useEffect, useState } from 'react';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Button, 
  ButtonGroup, 
  FormGroup,
  Input,
  Label,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  UncontrolledDropdown
} from 'reactstrap';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import Cascader from 'rc-cascader';
import ButtonIcon from '../../common/ButtonIcon';
import { Link } from 'react-router-dom';
import Badge from 'reactstrap/es/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../../common/FalconCardHeader';
import uuid from 'uuid/v1';
import { getPaginationArray } from '../../../helpers/utils';

const orderFormatter = (dataField, { id, name, email }: row) => (
  <Fragment>
    <Link to="/e-commerce/order-details">
      <strong>#{id}</strong>
    </Link>{' '}
    by <strong>{name}</strong>
    <br />
    <a href={`mailto:${email}`}>{email}</a>
  </Fragment>
);

const shippingFormatter = (address, { shippingType }: row) => (
  <Fragment>
    {address}
    <p className="mb-0 text-500">{shippingType}</p>
  </Fragment>
);

const badgeFormatter = status => {
  let color = '';
  let icon = '';
  let text = '';
  switch (status) {
    case 'success':
      color = 'success';
      icon = 'check';
      text = 'Completed';
      break;
    case 'hold':
      color = 'secondary';
      icon = 'ban';
      text = 'On hold';
      break;
    case 'processing':
      color = 'primary';
      icon = 'redo';
      text = 'Processing';
      break;
    case 'pending':
      color = 'warning';
      icon = 'stream';
      text = 'Pending';
      break;
    default:
      color = 'warning';
      icon = 'stream';
      text = 'Pending';
  }

  return (
    <Badge color={`soft-${color}`} className="rounded-capsule fs--1 d-block">
      {text}
      <FontAwesomeIcon icon={icon} transform="shrink-2" className="ml-1" />
    </Badge>
  );
};

const amountFormatter = amount => {
  return (
    <Fragment>
      {'$'}
      {amount}
    </Fragment>
  );
};

const actionFormatter = (dataField, { id }: row) => (
  // Control your row with this id
  <UncontrolledDropdown>
    <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
      <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
    </DropdownToggle>
    <DropdownMenu right className="border py-2">
      <DropdownItem onClick={() => console.log('Completed: ', id)}>Completed</DropdownItem>
      <DropdownItem onClick={() => console.log('Processing: ', id)}>Processing</DropdownItem>
      <DropdownItem onClick={() => console.log('On hold: ', id)}>On hold</DropdownItem>
      <DropdownItem onClick={() => console.log('Pending: ', id)}>Pending</DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={() => console.log('Delete: ', id)} className="text-danger">
        Delete
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);
const orders = [
  {
    id: uuid().split('-')[0],
    // id: 181,
    name: 'Ricky Antony',
    email: 'ricky@example.com',
    date: '20/04/2019',
    address: 'Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149',
    shippingType: 'Via Flat Rate',
    status: 'success',
    amount: 99
  },
  {
    id: uuid().split('-')[0],
    // id: 182,
    name: 'Kin Rossow',
    email: 'kin@example.com',
    date: '20/04/2019',
    address: 'Kin Rossow, 1 Hollywood Blvd,Beverly Hills, California 90210',
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 120
  },
  {
    id: uuid().split('-')[0],
    // id: 183,
    name: 'Merry Diana',
    email: 'merry@example.com',
    date: '30/04/2019',
    address: 'Merry Diana, 1 Infinite Loop, Cupertino, California 90210',
    shippingType: 'Via Link Road',
    status: 'hold',
    amount: 70
  },
  {
    id: uuid().split('-')[0],
    // id: 184,
    name: 'Bucky Robert',
    email: 'bucky@example.com',
    date: '30/04/2019',
    address: 'Bucky Robert, 1 Infinite Loop, Cupertino, California 90210',
    shippingType: 'Via Free Shipping',
    status: 'pending',
    amount: 92
  },
  {
    id: uuid().split('-')[0],
    // id: 185,
    name: 'Rocky Zampa',
    email: 'rocky@example.com',
    date: '30/04/2019',
    address: 'Rocky Zampa, 1 Infinite Loop, Cupertino, California 90210',
    shippingType: 'Via Free Road',
    status: 'hold',
    amount: 120
  },
  {
    id: uuid().split('-')[0],
    // id: 186,
    name: 'Ricky John',
    email: 'ricky@example.com',
    date: '30/04/2019',
    address: 'Ricky John, 1 Infinite Loop, Cupertino, California 90210',
    shippingType: 'Via Free Shipping',
    status: 'processing',
    amount: 145
  },
  {
    id: uuid().split('-')[0],
    // id: 187,
    name: 'Cristofer Henric',
    email: 'cristofer@example.com',
    date: '30/04/2019',
    address: 'Cristofer Henric, 1 Infinite Loop, Cupertino, California 90210',
    shippingType: 'Via Flat Rate',
    status: 'success',
    amount: 55
  },
  {
    id: uuid().split('-')[0],
    // id: 188,
    name: 'Brate Lee',
    email: 'lee@example.com',
    date: '29/04/2019',
    address: 'Brate Lee, 1 Infinite Loop, Cupertino, California 90210',
    shippingType: 'Via Link Road',
    status: 'hold',
    amount: 90
  },
  {
    id: uuid().split('-')[0],
    // id: 189,
    name: 'Thomas Stephenson',
    email: 'Stephenson@example.com',
    date: '29/04/2019',
    address: 'Thomas Stephenson, 116 Ballifeary Road, Bamff',
    shippingType: 'Via Flat Rate',
    status: 'processing',
    amount: 52
  },
  {
    id: uuid().split('-')[0],
    // id: 190,
    name: 'Evie Singh',
    email: 'eviewsing@example.com',
    date: '29/04/2019',
    address: 'Evie Singh, 54 Castledore Road, Tunstead',
    shippingType: 'Via Flat Rate',
    status: 'success',
    amount: 90
  },
  {
    id: uuid().split('-')[0],
    // id: 191,
    name: 'David Peters',
    email: 'peter@example.com',
    date: '29/04/2019',
    address: 'David Peters, Rhyd Y Groes, Rhosgoch, LL66 0AT',
    shippingType: 'Via Link Road',
    status: 'success',
    amount: 69
  },
  {
    id: uuid().split('-')[0],
    // id: 192,
    name: 'Jennifer Johnson',
    email: 'jennifer@example.com',
    date: '28/04/2019',
    address: 'Jennifer Johnson, Rhyd Y Groes, Rhosgoch, LL66 0AT',
    shippingType: 'Via Flat Rate',
    status: 'processing',
    amount: 112
  },
  {
    id: uuid().split('-')[0],
    // id: 193,
    name: ' Demarcus Okuneva',
    email: 'okuneva@example.com',
    date: '28/04/2019',
    address: ' Demarcus Okuneva, 90555 Upton Drive Jeffreyview, UT 08771',
    shippingType: 'Via Flat Rate',
    status: 'success',
    amount: 99
  },
  {
    id: uuid().split('-')[0],
    // id: 194,
    name: 'Simeon Harber',
    email: 'simeon@example.com',
    date: '27/04/2019',
    address: 'Simeon Harber, 702 Kunde Plain Apt. 634 East Bridgetview, HI 13134-1862',
    shippingType: 'Via Free Shipping',
    status: 'hold',
    amount: 129
  },
  {
    id: uuid().split('-')[0],
    // id: 195,
    name: 'Lavon Haley',
    email: 'lavon@example.com',
    date: '27/04/2019',
    address: 'Lavon Haley, 30998 Adonis Locks McGlynnside, ID 27241',
    shippingType: 'Via Free Shipping',
    status: 'pending',
    amount: 70
  },
  {
    id: uuid().split('-')[0],
    // id: 196,
    name: 'Ashley Kirlin',
    email: 'ashley@example.com',
    date: '26/04/2019',
    address: 'Ashley Kirlin, 43304 Prosacco Shore South Dejuanfurt, MO 18623-0505',
    shippingType: 'Via Link Road',
    status: 'processing',
    amount: 39
  },
  {
    id: uuid().split('-')[0],
    // id: 197,
    name: 'Johnnie Considine',
    email: 'johnnie@example.com',
    date: '26/04/2019',
    address: 'Johnnie Considine, 6008 Hermann Points Suite 294 Hansenville, TN 14210',
    shippingType: 'Via Flat Rate',
    status: 'pending',
    amount: 70
  },
  {
    id: uuid().split('-')[0],
    // id: 198,
    name: 'Trace Farrell',
    email: 'trace@example.com',
    date: '26/04/2019',
    address: 'Trace Farrell, 431 Steuber Mews Apt. 252 Germanland, AK 25882',
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 70
  },
  {
    id: uuid().split('-')[0],
    // id: 199,
    name: 'Estell Nienow',
    email: 'nienow@example.com',
    date: '26/04/2019',
    address: 'Estell Nienow, 4167 Laverna Manor Marysemouth, NV 74590',
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 59
  },
  {
    id: uuid().split('-')[0],
    // id: 200,
    name: 'Daisha Howe',
    email: 'howe@example.com',
    date: '25/04/2019',
    address: 'Daisha Howe, 829 Lavonne Valley Apt. 074 Stehrfort, RI 77914-0379',
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 39
  },
  {
    id: uuid().split('-')[0],
    // id: 201,
    name: 'Miles Haley',
    email: 'haley@example.com',
    date: '24/04/2019',
    address: 'Miles Haley, 53150 Thad Squares Apt. 263 Archibaldfort, MO 00837',
    shippingType: 'Via Flat Rate',
    status: 'success',
    amount: 55
  },
  {
    id: uuid().split('-')[0],
    // id: 202,
    name: 'Brenda Watsica',
    email: 'watsica@example.com',
    date: '24/04/2019',
    address: "Brenda Watsica, 9198 O'Kon Harbors Morarborough, IA 75409-7383",
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 89
  },
  {
    id: uuid().split('-')[0],
    // id: 203,
    name: "Ellie O'Reilly",
    email: 'ellie@example.com',
    date: '24/04/2019',
    address: "Ellie O'Reilly, 1478 Kaitlin Haven Apt. 061 Lake Muhammadmouth, SC 35848",
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 47
  },
  {
    id: uuid().split('-')[0],
    // id: 204,
    name: 'Garry Brainstrow',
    email: 'garry@example.com',
    date: '23/04/2019',
    address: 'Garry Brainstrow, 13572 Kurt Mews South Merritt, IA 52491',
    shippingType: 'Via Free Shipping',
    status: 'success',
    amount: 139
  },
  {
    id: uuid().split('-')[0],
    // id: 205,
    name: 'Estell Pollich',
    email: 'estell@example.com',
    date: '23/04/2019',
    address: 'Estell Pollich, 13572 Kurt Mews South Merritt, IA 52491',
    shippingType: 'Via Free Shipping',
    status: 'hold',
    amount: 49
  },
  {
    id: uuid().split('-')[0],
    // id: 206,
    name: 'Ara Mueller',
    email: 'ara@example.com',
    date: '23/04/2019',
    address: 'Ara Mueller, 91979 Kohler Place Waelchiborough, CT 41291',
    shippingType: 'Via Flat Rate',
    status: 'hold',
    amount: 19
  },
  {
    id: uuid().split('-')[0],
    // id: 207,
    name: 'Lucienne Blick',
    email: 'blick@example.com',
    date: '23/04/2019',
    address: 'Lucienne Blick, 6757 Giuseppe Meadows Geraldinemouth, MO 48819-4970',
    shippingType: 'Via Flat Rate',
    status: 'hold',
    amount: 59
  },
  {
    id: uuid().split('-')[0],
    // id: 208,
    name: 'Laverne Haag',
    email: 'haag@example.com',
    date: '22/04/2019',
    address: 'Laverne Haag, 2327 Kaylee Mill East Citlalli, AZ 89582-3143',
    shippingType: 'Via Flat Rate',
    status: 'hold',
    amount: 49
  },
  {
    id: uuid().split('-')[0],
    // id: 209,
    name: 'Brandon Bednar',
    email: 'bednar@example.com',
    date: '22/04/2019',
    address: 'Brandon Bednar, 25156 Isaac Crossing Apt. 810 Lonborough, CO 83774-5999',
    shippingType: 'Via Flat Rate',
    status: 'hold',
    amount: 39
  },
  {
    id: uuid().split('-')[0],
    // id: 210,
    name: 'Dimitri Boehm',
    email: 'dimitri@example.com',
    date: '23/04/2019',
    address: 'Dimitri Boehm, 71603 Wolff Plains Apt. 885 Johnstonton, MI 01581',
    shippingType: 'Via Flat Rate',
    status: 'hold',
    amount: 111
  }
];
const columns = [
  {
    dataField: 'id',
    text: 'Space',
    classes: 'py-2 align-middle',
    formatter: orderFormatter,
    sort: true
  },
  {
    dataField: 'date',
    text: 'Date',
    classes: 'py-2 align-middle',
    sort: true
  },
  {
    dataField: 'address',
    text: 'Description',
    classes: 'py-2 align-middle',
    formatter: shippingFormatter,
    sort: true
  },
  {
    dataField: 'status',
    text: 'Status',
    classes: 'py-2 align-middle',
    formatter: badgeFormatter,
    sort: true
  },
  {
    dataField: '',
    text: '',
    classes: 'py-2 align-middle',
    formatter: actionFormatter,
    align: 'right'
  }
];



const options = {
  custom: true,
  sizePerPage: 10,
  totalSize: orders.length
};

const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
  <div className="custom-control custom-checkbox">
    <input
      className="custom-control-input"
      {...rest}
      onChange={() => {}}
      ref={input => {
        if (input) input.indeterminate = indeterminate;
      }}
    />
    <label className="custom-control-label" />
  </div>
);

const selectRow = onSelect => ({
  mode: 'checkbox',
  classes: 'py-2 align-middle',
  clickToSelect: false,
  selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
  selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
  onSelect: onSelect,
  onSelectAll: onSelect
});

const EquipmentFault = () => {
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [baselineStartDatetime, setBaselineStartDatetime] = useState(null);
  const [baselineEndDatetime, setBaselineEndDatetime] = useState(null);
  const [reportingStartDatetime, setReportingStartDatetime] = useState(null);
  const [reportingEndDatetime, setReportingEndDatetime] = useState(null);
  const [periodType, setPeriodType] = useState('hourly');
  
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

  const periodTypeOptions = [
    { value: 'yearly', label: '年'},
    { value: 'monthly', label: '月'},
    { value: 'daily', label: '日'},
    { value: 'hourly', label: '时'}];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';
  
  // State
  let table = createRef();
  
  const [isSelected, setIsSelected] = useState(false);
  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }
  useEffect(() => {
    
  }, []);

  
  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>设备数据分析</BreadcrumbItem><BreadcrumbItem active>设备故障分析</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                空间
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
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="baselineStartDatetime">
                基准期开始(可选)
                </Label>
                <Datetime id='baselineStartDatetime' value={baselineStartDatetime} />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="baselineEndDatetime">
                基准期结束(可选)
                </Label>
                
                <Datetime id='baselineEndDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingStartDatetime">
                报告期开始
                </Label>
                <Datetime id='reportingStartDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingEndDatetime">
                报告期结束
                </Label>
                <Datetime id='reportingEndDatetime' />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="periodType">
                时间尺度
                </Label>
                <CustomInput type="select" id="periodType" name="periodType" value={periodType} onChange={({ target }) => setPeriodType(target.value)}
                >
                  { periodTypeOptions.map((periodType, index) => (
                      <option value={periodType.value} key={periodType.value}>
                        {periodType.label}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <br></br>
                <ButtonGroup id="submit">
                  <Button color="success" >提交</Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row> 
        </CardBody>
      </Card>
          <Card className="mb-3">
          <FalconCardHeader title="Alarms" light={false}>
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
                        data={orders}
                        columns={columns}
                        selectRow={selectRow(onSelect)}
                        bordered={false}
                        classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                        rowClasses="btn-reveal-trigger"
                        headerClasses="bg-200 text-900"
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

export default EquipmentFault;
