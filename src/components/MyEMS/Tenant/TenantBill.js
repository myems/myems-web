import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  Button, 
  ButtonGroup, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardFooter,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Table, } from 'reactstrap';
import Loader from '../../common/Loader';
import ButtonIcon from '../../common/ButtonIcon';
import createMarkup from '../../../helpers/createMarkup';
import Datetime from 'react-datetime';
import Cascader from 'rc-cascader';
import { isIterableArray } from '../../../helpers/utils';
import useFakeFetch from '../../../hooks/useFakeFetch';
import logoInvoice from '../../../assets/img/logos/myems.png';
import { withTranslation } from 'react-i18next';



const calculateSubtotal = products => {
  return products.reduce((currentValue, product) => {
    return product.quantity * product.rate + currentValue;
  }, 0);
};

const formatCurrency = (number, currency) =>
  `${currency}${number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;

const ProductTr = ({ name, description, startdate, enddate, quantity, rate }) => {
  return (
    <tr>
      <td className="align-middle">
        <h6 className="mb-0 text-nowrap">{name}</h6>
        <p className="mb-0">{description}</p>
      </td>
      <td className="align-middle text-center">{startdate}</td>
      <td className="align-middle text-center">{enddate}</td>
      <td className="align-middle text-center">{quantity.toFixed(3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</td>
      <td className="align-middle text-right">{rate.toFixed(3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</td>
      <td className="align-middle text-right">{(quantity * rate).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</td>
    </tr>
  );
};

ProductTr.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired
};

const InvoiceHeader = ({ institution, logo, address }) => (
  <Row className="align-items-center text-center mb-3">
    <Col sm={6} className="text-sm-left">
      <img src={logo} alt="invoice" width={150} />
    </Col>
    <Col className="text-sm-right mt-3 mt-sm-0">
      <h2 className="mb-3">付款通知书</h2>
      <h5>{institution}</h5>
      {address && <p className="fs--1 mb-0" dangerouslySetInnerHTML={createMarkup(address)} />}
    </Col>
    <Col xs={12}>
      <hr />
    </Col>
  </Row>
);

InvoiceHeader.propTypes = {
  institution: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  address: PropTypes.string
};

const Invoice = ({t}) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [tenant, setTenant] = useState(undefined);
  const [reportingStartDatetime, setReportingStartDatetime] = useState(null);
  const [reportingEndDatetime, setReportingEndDatetime] = useState(null);
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

  const tenantList = [
    { value: 1, label: '海上捞火锅(北京王府井店)'},
    { value: 2, label: 'Longines浪琴'},
    { value: 3, label: 'Starbucks星巴克'},
    { value: 4, label: 'Versace/范思哲'}];
    
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';
  
  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  const rawInvoice = {
    institution: 'MyEMS商场有限公司',
    logo: logoInvoice,
    address: '王府井大街<br />北京市东城区',
    tax: 0.13,
    currency: '¥',
    user: {
      name: '海上捞火锅(北京王府井店)',
      address: '王府井大街MyEMS商场三层<br/>东城区<br/>北京市',
      email: 'example@163.com',
      cell: '+86-135-6666-7777'
    },
    summary: {
      invoice_no: 202007310015,
      order_number: 'AD20295',
      invoice_date: '2020-07-31',
      payment_due: '2020-09-30',
      amount_due: 12644.08
    },
    products: [
      {
        name: '电',
        startdate: '2020-07-01',
        enddate: '2020-07-31',
        quantity: 1589.920,
        rate: 1.500
      },
      {
        name: '自来水',
        startdate: '2020-07-01',
        enddate: '2020-07-31',
        quantity: 387.980,
        rate: 8.901
      },
      {
        name: '天然气',
        startdate: '2020-07-01',
        enddate: '2020-07-31',
        quantity: 879.981,
        rate: 6.081
      }
    ]
  };
  const { loading: invoiceLoading, data: invoice } = useFakeFetch(rawInvoice);
  useEffect(() => {
    if (isIterableArray(invoice.products)) {
      setSubtotal(calculateSubtotal(invoice.products));
    }
  }, [invoice]);

  useEffect(() => {
    setTax(subtotal * invoice.tax);
  }, [subtotal, invoice]);

  useEffect(() => {
    setTotal(subtotal + tax);
  }, [subtotal, tax]);

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Tenant Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Tenant Bill')}</BreadcrumbItem>
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
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="tenant">
                租户
                </Label>
                <CustomInput type="select" id="租户" name="tenant" value={tenant} onChange={({ target }) => setTenant(target.value)}
                >
                  { tenantList.map((tenant, index) => (
                      <option value={tenant.value} key={tenant.value}>
                        {tenant.label}
                      </option>
                    ))}
                </CustomInput>
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
        <CardBody>
          <Row className="justify-content-between align-items-center">
            <Col md>
              <h5 className="mb-2 mb-md-0">租赁合同号码: {invoiceLoading ? '' : invoice.summary.order_number}</h5>
            </Col>
            <Col xs="auto">
              <ButtonIcon color="falcon-default" size="sm" icon="arrow-down" className="mr-2 mb-2 mb-sm-0">
              下载 (.pdf)
              </ButtonIcon>
              <ButtonIcon color="falcon-default" size="sm" icon="print" className="mr-2 mb-2 mb-sm-0">
              打印
              </ButtonIcon>
              
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          {invoiceLoading ? (
            <Loader />
          ) : (
            <InvoiceHeader institution={invoice.institution} logo={invoice.logo} address={invoice.address} />
          )}

          {invoiceLoading ? (
            <Loader />
          ) : (
            <Row className="justify-content-between align-items-center">
              <Col>
                <h6 className="text-500">致</h6>
                <h5>{invoice.user.name}</h5>
                <p className="fs--1" dangerouslySetInnerHTML={createMarkup(invoice.user.address)} />
                <p className="fs--1">
                  <a href={`mailto:${invoice.user.email}`}>{invoice.user.email}</a>
                  <br />
                  <a href={`tel:${invoice.user.cell.split('-').join('')}`}>{invoice.user.cell}</a>
                </p>
              </Col>
              <Col sm="auto" className="ml-auto">
                <div className="table-responsive">
                  <Table size="sm" borderless className="fs--1">
                    <tbody>
                      <tr>
                        <th className="text-sm-right">账单号码:</th>
                        <td>{invoice.summary.invoice_no}</td>
                      </tr>
                      <tr>
                        <th className="text-sm-right">租赁合同号码:</th>
                        <td>{invoice.summary.order_number}</td>
                      </tr>
                      <tr>
                        <th className="text-sm-right">账单日期:</th>
                        <td>{invoice.summary.invoice_date}</td>
                      </tr>
                      <tr>
                        <th className="text-sm-right">付款到期日:</th>
                        <td>{invoice.summary.payment_due}</td>
                      </tr>
                      <tr className="alert-success font-weight-bold">
                        <th className="text-sm-right">应付款金额:</th>
                        <td>{formatCurrency(invoice.summary.amount_due, invoice.currency)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          )}

          {invoiceLoading ? (
            <Loader />
          ) : (
            <div className="table-responsive mt-4 fs--1">
              <Table striped className="border-bottom">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="border-0">能耗分类</th>
                    <th className="border-0 text-center">开始日期</th>
                    <th className="border-0 text-center">结束日期</th>
                    <th className="border-0 text-center">数量</th>
                    <th className="border-0 text-right">费率</th>
                    <th className="border-0 text-right">金额</th>
                  </tr>
                </thead>
                <tbody>
                  {isIterableArray(invoice.products) &&
                    invoice.products.map((product, index) => <ProductTr {...product} key={index} />)}
                </tbody>
              </Table>
            </div>
          )}

          {invoiceLoading ? (
            <Loader />
          ) : (
            <Row noGutters className="justify-content-end">
              <Col xs="auto">
                <Table size="sm" borderless className="fs--1 text-right">
                  <tbody>
                    <tr>
                      <th className="text-900">小计:</th>
                      <td className="font-weight-semi-bold">{formatCurrency(subtotal, invoice.currency)}</td>
                    </tr>
                    <tr>
                      <th className="text-900">VAT 增值税销项税金 13%:</th>
                      <td className="font-weight-semi-bold">{formatCurrency(tax, invoice.currency)}</td>
                    </tr>
                    <tr className="border-top">
                      <th className="text-900">应付金额合计:</th>
                      <td className="font-weight-semi-bold">{formatCurrency(total, invoice.currency)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </CardBody>
        <CardFooter className="bg-light">
          <p className="fs--1 mb-0">
            <strong>请确保在上述付款到期日或之前付款, 汇款至以下账户:</strong><br />
            账户名称: MyEMS商场有限公司<br />
            开户银行: 中国银行股份有限公司北京王府井支行<br />
            银行地址: 中国北京市东城区王府井大街<br />
            人民币账户: 1188228822882288<br />
          </p>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(Invoice);
