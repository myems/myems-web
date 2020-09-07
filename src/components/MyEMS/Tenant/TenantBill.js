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
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Table,
} from 'reactstrap';
import Loader from '../../common/Loader';
import ButtonIcon from '../../common/ButtonIcon';
import createMarkup from '../../../helpers/createMarkup';
import Datetime from 'react-datetime';
import moment from 'moment';
import Cascader from 'rc-cascader';
import { isIterableArray } from '../../../helpers/utils';
import logoInvoice from '../../../assets/img/logos/myems.png';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { baseURL } from '../../../config';

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
  startdate: PropTypes.string.isRequired,
  enddate: PropTypes.string.isRequired,
  description: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired
};

const InvoiceHeader = ({ institution, logo, address, t }) => (
  <Row className="align-items-center text-center mb-3">
    <Col sm={6} className="text-sm-left">
      <img src={logo} alt="invoice" width={150} />
    </Col>
    <Col className="text-sm-right mt-3 mt-sm-0">
      <h2 className="mb-3">{t('Payment Notice')}</h2>
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

const Invoice = ({ setRedirect, setRedirectUrl, t }) => {
  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (is_logged_in === null || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, 1000 * 60 * 60 * 8);
      createCookie('user_name', user_name, 1000 * 60 * 60 * 8);
      createCookie('user_display_name', user_display_name, 1000 * 60 * 60 * 8);
      createCookie('user_uuid', user_uuid, 1000 * 60 * 60 * 8);
      createCookie('token', token, 1000 * 60 * 60 * 8);
    }
  });
  //State
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [tenant, setTenant] = useState(undefined);
  let current_moment = moment();
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(current_moment.clone().subtract(1, 'months').startOf('month'));
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(current_moment.clone().subtract(1, 'months').endOf('month'));
  const [cascaderOptions, setCascaderOptions] = useState(undefined);

  useEffect(() => {
    let isResponseOK = false;
    fetch(baseURL + '/spaces/tree', {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      console.log(response)
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      console.log(json)
      if (isResponseOK) {
        // rename keys 
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        setCascaderOptions(json);
        setSelectedSpaceName([json[0]].map(o => o.label))
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });

  }, []);

  const tenantList = [
    { value: 1, label: '海上捞火锅(北京王府井店)' },
    { value: 2, label: 'Longines浪琴' },
    { value: 3, label: 'Starbucks星巴克' },
    { value: 4, label: 'Versace/范思哲' }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onSpaceCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'))
  }

  const invoice = {
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

  let onReportingPeriodBeginsDatetimeChange = (newDateTime) => {
    setReportingPeriodBeginsDatetime(newDateTime);
  }

  let onReportingPeriodEndsDatetimeChange = (newDateTime) => {
    setReportingPeriodEndsDatetime(newDateTime);
  }

  var getValidReportingPeriodBeginsDatetimes = function (currentDate) {
    return currentDate.isBefore(moment(reportingPeriodEndsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidReportingPeriodEndsDatetimes = function (currentDate) {
    return currentDate.isAfter(moment(reportingPeriodBeginsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
  };
  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Tenant Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Tenant Bill')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {t('Space')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
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
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="reportingPeriodBeginsDatetime">
                    {t('Reporting Period Begins')}
                  </Label>
                  <Datetime id='reportingPeriodBeginsDatetime'
                    value={reportingPeriodBeginsDatetime}
                    onChange={onReportingPeriodBeginsDatetimeChange}
                    isValidDate={getValidReportingPeriodBeginsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="reportingPeriodEndsDatetime">
                    {t('Reporting Period Ends')}
                  </Label>
                  <Datetime id='reportingPeriodEndsDatetime'
                    value={reportingPeriodEndsDatetime}
                    onChange={onReportingPeriodEndsDatetimeChange}
                    isValidDate={getValidReportingPeriodEndsDatetimes}
                    closeOnSelect={true} />
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
          </Form>
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardBody>
          <Row className="justify-content-between align-items-center">
            <Col md>
              <h5 className="mb-2 mb-md-0">{t('Lease Contract Number')}: {invoice.summary.order_number}</h5>
            </Col>
            <Col xs="auto">
              <ButtonIcon color="falcon-default" size="sm" icon="arrow-down" className="mr-2 mb-2 mb-sm-0">
                {t('Download')} (.pdf)
              </ButtonIcon>
              <ButtonIcon color="falcon-default" size="sm" icon="print" className="mr-2 mb-2 mb-sm-0">
                {t('Print')}
              </ButtonIcon>

            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <InvoiceHeader institution={invoice.institution} logo={invoice.logo} address={invoice.address} t={t} />
          <Row className="justify-content-between align-items-center">
            <Col>
              <h6 className="text-500">{t('Bill To')}</h6>
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
                      <th className="text-sm-right">{t('Bill Number')}:</th>
                      <td>{invoice.summary.invoice_no}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-right">{t('Lease Contract Number')}:</th>
                      <td>{invoice.summary.order_number}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-right">{t('Bill Date')}:</th>
                      <td>{invoice.summary.invoice_date}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-right">{t('Payment Due Date')}:</th>
                      <td>{invoice.summary.payment_due}</td>
                    </tr>
                    <tr className="alert-success font-weight-bold">
                      <th className="text-sm-right">{t('Amount Payable')}:</th>
                      <td>{formatCurrency(invoice.summary.amount_due, invoice.currency)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <div className="table-responsive mt-4 fs--1">
            <Table striped className="border-bottom">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border-0">{t('Energy Category')}</th>
                  <th className="border-0 text-center">{t('Billing Period Start')}</th>
                  <th className="border-0 text-center">{t('Billing Period End')}</th>
                  <th className="border-0 text-center">{t('Quantity')}</th>
                  <th className="border-0 text-right">{t('Price')}</th>
                  <th className="border-0 text-right">{t('Amount')}</th>
                </tr>
              </thead>
              <tbody>
                {isIterableArray(invoice.products) &&
                  invoice.products.map((product, index) => <ProductTr {...product} key={index} />)}
              </tbody>
            </Table>
          </div>
          <Row noGutters className="justify-content-end">
            <Col xs="auto">
              <Table size="sm" borderless className="fs--1 text-right">
                <tbody>
                  <tr>
                    <th className="text-900">{t('Subtotal')}:</th>
                    <td className="font-weight-semi-bold">{formatCurrency(subtotal, invoice.currency)}</td>
                  </tr>
                  <tr>
                    <th className="text-900">{t('VAT Output Tax')}:</th>
                    <td className="font-weight-semi-bold">{formatCurrency(tax, invoice.currency)}</td>
                  </tr>
                  <tr className="border-top">
                    <th className="text-900">{t('Total Amount Payable')}:</th>
                    <td className="font-weight-semi-bold">{formatCurrency(total, invoice.currency)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="bg-light">
          <p className="fs--1 mb-0">
            <strong>{t('Please make sure to pay on or before the payment due date above')}, {t('Send money to the following account')}:</strong><br />
            {t('Acount Name')}: MyEMS商场有限公司<br />
            {t('Bank Name')}: 中国银行股份有限公司北京王府井支行<br />
            {t('Bank Address')}: 中国北京市东城区王府井大街<br />
            {t('RMB Account')}: 1188228822882288<br />
          </p>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(withRedirect(Invoice));
