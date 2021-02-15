import React, { createRef, Fragment, useEffect, useState } from 'react';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  UncontrolledDropdown
} from 'reactstrap';
import ButtonIcon from '../../common/ButtonIcon';
import { Link } from 'react-router-dom';
import Badge from 'reactstrap/es/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../../common/FalconCardHeader';
import uuid from 'uuid/v1';
import { getPaginationArray } from '../../../helpers/utils';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';




const Notification = ({ setRedirect, setRedirectUrl, t }) => {
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
  }, );
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


  const orderFormatter = (dataField, { id, name, url }) => (
    <Fragment>
      <Link to="/e-commerce/order-details">
        <strong>#{id}</strong>
      </Link>{' '}
    by <strong>{name}</strong>
      <br />
      <a href={`${url}`}>{url}</a>
    </Fragment>
  );

  const shippingFormatter = (address, { shippingType }) => (
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
      case 'read':
        color = 'success';
        icon = 'check';
        text = 'Read';
        break;
      case 'archived':
        color = 'secondary';
        icon = 'stream';
        text = 'Archived';
        break;
      case 'new':
        color = 'primary';
        icon = 'redo';
        text = 'New';
        break;
      default:
        color = 'primary';
        icon = 'redo';
        text = 'New';
    }

    return (
      <Badge color={`soft-${color}`} className="rounded-capsule fs--1 d-block">
        {text}
        <FontAwesomeIcon icon={icon} transform="shrink-2" className="ml-1" />
      </Badge>
    );
  };

  const actionFormatter = (dataField, { id }) => (
    // Control your row with this id
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => console.log('Mark as Read: ', id)}>Mark as Read</DropdownItem>
        <DropdownItem onClick={() => console.log('Mark as New: ', id)}>Mark as New</DropdownItem>
        <DropdownItem onClick={() => console.log('Archive: ', id)}>Archive</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => console.log('Delete: ', id)} className="text-danger">Delete</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
  const notifications = [
    {
      id: 1,
      subject: 'Ricky Antony',
      url: 'ricky@example.com',
      createddatetime: '20/04/2019',
      message: 'Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149',
      status: 'new',
    },
    {
      id: 2,
      subject: 'Kin Rossow',
      url: 'kin@example.com',
      createddatetime: '20/04/2019',
      message: 'Kin Rossow, 1 Hollywood Blvd,Beverly Hills, California 90210',
      status: 'new',
    },
    {
      id: 3,
      subject: 'Merry Diana',
      url: 'merry@example.com',
      createddatetime: '30/04/2019',
      message: 'Merry Diana, 1 Infinite Loop, Cupertino, California 90210',
      status: 'read',
    },
    {
      id: 4,
      name: 'Bucky Robert',
      url: 'bucky@example.com',
      createddatetime: '30/04/2019',
      message: 'Bucky Robert, 1 Infinite Loop, Cupertino, California 90210',
      status: 'archived'
    },
    {
      id: 5,
      name: 'Dimitri Boehm',
      url: 'dimitri@example.com',
      createddatetime: '23/04/2019',
      message: 'Dimitri Boehm, 71603 Wolff Plains Apt. 885 Johnstonton, MI 01581',
      status: 'archived'
    }
  ];
  const columns = [
    {
      dataField: 'subject',
      text: 'Subject',
      classes: 'py-2 align-middle',
      formatter: orderFormatter,
      sort: true
    },
    {
      dataField: 'createddatetime',
      text: 'Created Datetime',
      classes: 'py-2 align-middle',
      sort: true
    },
    {
      dataField: 'message',
      text: 'Message',
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
    totalSize: notifications.length
  };

  const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
    <div className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        {...rest}
        onChange={() => { }}
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


  return (
    <Fragment>
      <Card className="mb-3">
        <FalconCardHeader title={t('Notification List')} light={false}>
          {isSelected ? (
            <InputGroup size="sm" className="input-group input-group-sm">
              <CustomInput type="select" id="bulk-select">
                <option>Bulk actions</option>
                <option value="MarkAsRead">MarkAsRead</option>
                <option value="Archive">Archive</option>
                <option value="Delete">Delete</option>
              </CustomInput>
              <Button color="falcon-default" size="sm" className="ml-2">
                Apply
                </Button>
            </InputGroup>
          ) : (
              <Fragment>
                <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
                  {t('Export')}
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
                      data={notifications}
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

export default withTranslation()(withRedirect(Notification));
