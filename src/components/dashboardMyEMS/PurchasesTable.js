import React, { Fragment, createRef } from 'react';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Badge from 'reactstrap/es/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row } from 'reactstrap';
import ButtonIcon from '../common/ButtonIcon';
import { Link } from 'react-router-dom';

const purchases = [
  {
    id: 1,
    customer: 'z Plath',
    email: 'john@gmail.com',
    product: 'Slick - Drag & Drop Bootstrap Generator',
    status: 'success',
    amount: 99
  },
  {
    id: 2,
    customer: 'Homer',
    email: 'sylvia@mail.ru',
    product: 'Bose SoundSport Wireless Headphones',
    status: 'success',
    amount: 634
  },
  {
    id: 3,
    customer: 'Edgar Allan Poe',
    email: 'edgar@yahoo.com',
    product: 'All-New Fire HD 8 Kids Edition Tablet',
    status: 'blocked',
    amount: 199
  },
  {
    id: 4,
    customer: 'William Butler Yeats',
    email: 'william@gmail.com',
    product: 'Apple iPhone XR (64GB)',
    status: 'success',
    amount: 798
  },
  {
    id: 5,
    customer: 'Rabindranath Tagore',
    email: 'tagore@twitter.com',
    product: 'ASUS Chromebook C202SA-YS02 11.6"',
    status: 'blocked',
    amount: 318
  },
  {
    id: 6,
    customer: 'Emily Dickinson',
    email: 'emily@gmail.com',
    product: 'Mirari OK to Wake! Alarm Clock & Night-Light',
    status: 'pending',
    amount: 11
  },
  {
    id: 7,
    customer: 'Giovanni Boccaccio',
    email: 'giovanni@outlook.com',
    product: 'Summer Infant Contoured Changing Pad',
    status: 'success',
    amount: 31
  },
  {
    id: 8,
    customer: 'Oscar Wilde',
    email: 'oscar@hotmail.com',
    product: 'Munchkin 6 Piece Fork and Spoon Set',
    status: 'success',
    amount: 43
  },
  {
    id: 9,
    customer: 'John Doe',
    email: 'doe@gmail.com',
    product: 'Falcon - Responsive Dashboard Template',
    status: 'success',
    amount: 57
  },
  {
    id: 10,
    customer: 'Emma Watson',
    email: 'emma@gmail.com',
    product: 'Apple iPhone XR (64GB)',
    status: 'blocked',
    amount: 999
  },
  {
    id: 11,
    customer: 'Sylvia Plath',
    email: 'plath@yahoo.com',
    product: 'All-New Fire HD 8 Kids Edition Tablet',
    status: 'pending',
    amount: 199
  },
  {
    id: 12,
    customer: 'Iori Kim',
    email: 'ikim@yahoo.com',
    product: 'ASUS Chromebook C202SA-YS02 11.6"',
    status: 'pending',
    amount: 200
  }
];

const CustomTotal = ({ sizePerPage, totalSize, page, lastIndex }) => (
  <span>
    {(page - 1) * sizePerPage + 1} to {lastIndex > totalSize ? totalSize : lastIndex} of {totalSize} —{' '}
  </span>
);

const customerFormatter = customerName => (
  <Link to="pages/customer-details" className="font-weight-semi-bold">
    {customerName}
  </Link>
);

const badgeFormatter = status => {
  let color = '';
  let icon = '';
  let text = '';
  switch (status) {
    case 'success':
      color = 'success';
      icon = 'check';
      text = 'Success';
      break;
    case 'blocked':
      color = 'secondary';
      icon = 'ban';
      text = 'Blocked';
      break;
    default:
      color = 'warning';
      icon = 'stream';
      text = 'Pending';
  }
  return (
    <Badge color={`soft-${color}`} className="rounded-capsule">
      {text}
      <FontAwesomeIcon icon={icon} transform="shrink-2" className="ml-1" />
    </Badge>
  );
};

const amountFormatter = amount => <Fragment>${amount}</Fragment>;

const columns = [
  {
    dataField: 'customer',
    text: 'Customer',
    formatter: customerFormatter,
    classes: 'border-0 align-middle',
    headerClasses: 'border-0',
    sort: true
  },
  {
    dataField: 'email',
    text: 'Email',
    classes: 'border-0 align-middle',
    headerClasses: 'border-0',
    sort: true
  },
  {
    dataField: 'product',
    text: 'Product',
    classes: 'border-0 align-middle',
    headerClasses: 'border-0',
    sort: true
  },
  {
    dataField: 'status',
    text: 'Payment',
    formatter: badgeFormatter,
    classes: 'border-0 align-middle fs-0',
    headerClasses: 'border-0',
    sort: true
  },
  {
    dataField: 'amount',
    text: 'Amount',
    formatter: amountFormatter,
    classes: 'border-0 align-middle',
    headerClasses: 'border-0',
    sort: true,
    align: 'right',
    headerAlign: 'right'
  },
  {
    dataField: 'action',
    classes: 'border-0 align-middle',
    headerClasses: 'border-0',
    text: ''
  }
];

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
  clickToSelect: false,
  selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
  selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
  headerColumnStyle: { border: 0, verticalAlign: 'middle' },
  selectColumnStyle: { border: 0, verticalAlign: 'middle' },
  onSelect: onSelect,
  onSelectAll: onSelect
});

const options = {
  custom: true,
  sizePerPage: 6,
  totalSize: purchases.length
};

const PurchasesTable = ({ setIsSelected }) => {
  let table = createRef();
  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  const handleViewAll = ({ onSizePerPageChange }, newSizePerPage) => {
    onSizePerPageChange(newSizePerPage, 1);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  return (
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
                data={purchases}
                columns={columns}
                selectRow={selectRow(onSelect)}
                bordered={false}
                classes="table-dashboard table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                rowClasses="btn-reveal-trigger border-top border-200"
                headerClasses="bg-200 text-900 border-y border-200"
                {...paginationTableProps}
              />
            </div>
            <Row noGutters className="px-1 py-3">
              <Col className="pl-3 fs--1">
                <CustomTotal {...paginationProps} lastIndex={lastIndex} />
                <ButtonIcon
                  color="link"
                  size="sm"
                  icon="chevron-right"
                  iconAlign="right"
                  transform="down-1 shrink-4"
                  className="px-0 font-weight-semi-bold"
                  onClick={() => handleViewAll(paginationProps, purchases.length)}
                >
                  view all
                </ButtonIcon>
              </Col>
              <Col xs="auto" className="pr-3">
                <Button
                  color={paginationProps.page === 1 ? 'light' : 'primary'}
                  size="sm"
                  onClick={handlePrevPage(paginationProps)}
                  disabled={paginationProps.page === 1}
                  className="px-4"
                >
                  Previous
                </Button>
                <Button
                  color={lastIndex >= paginationProps.totalSize ? 'light' : 'primary'}
                  size="sm"
                  onClick={handleNextPage(paginationProps)}
                  disabled={lastIndex >= paginationProps.totalSize}
                  className="px-4 ml-2"
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Fragment>
        );
      }}
    </PaginationProvider>
  );
};

export default PurchasesTable;
