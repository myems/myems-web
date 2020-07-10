import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Button, CustomInput, Modal, ModalHeader, ButtonGroup, Label, Media, Badge } from 'reactstrap';
import AppContext from '../../context/Context';
import defaultModeImg from '../../assets/img/generic/falcon-mode-default.jpg';
import darkModeImg from '../../assets/img/generic/falcon-mode-dark.jpg';
import invertedImg from '../../assets/img/generic/inverted.png';
import card from '../../assets/img/generic/card.png';
import vibrant from '../../assets/img/generic/vibrant.png';
import transparent from '../../assets/img/generic/default.png';
import leftArrowFromLeft from '../../assets/img/icons/left-arrow-from-left.svg';
import arrowsH from '../../assets/img/icons/arrows-h.svg';
import paragraph from '../../assets/img/icons/paragraph.svg';
import settings from '../../assets/img/illustrations/settings.png';
import Flex from '../common/Flex';
import ScrollBarCustom from '../common/ScrollBarCustom';
import { createCookie, getCookieValue, getPageName } from '../../helpers/utils';
import VerticalNavRadioBtn from './VerticalNavStyleRadioBtn';

const SidePanelModal = ({ autoShow, showOnce, autoShowDelay, cookieExpireTime, path }) => {
  const {
    isOpenSidePanel,
    toggleModal,
    isFluid,
    setIsFluid,
    isRTL,
    setIsRTL,
    isDark,
    setIsDark,
    isTopNav,
    setIsTopNav,
    setIsOpenSidePanel
  } = useContext(AppContext);

  const isKanban = getPageName('kanban');

  useEffect(() => {
    let modalStatus = getCookieValue('modalClose');

    if (modalStatus === null && autoShow) {
      setTimeout(() => {
        setIsOpenSidePanel(prev => !prev);
        showOnce && createCookie('modalClose', false, cookieExpireTime);
      }, autoShowDelay);
    }
  }, [autoShow, showOnce, setIsOpenSidePanel, autoShowDelay, cookieExpireTime]);

  return (
    <Modal
      isOpen={isOpenSidePanel}
      toggle={toggleModal}
      modalClassName="overflow-hidden modal-fixed-right modal-theme"
      className="modal-dialog-vertical"
      contentClassName="vh-100 border-0"
    >
      <ModalHeader tag="div" toggle={toggleModal} className="modal-header-settings">
        <div className="py-1 flex-grow-1">
          <h5 className="text-white">
            <FontAwesomeIcon icon="palette" className="mr-2 fs-0" />
            Settings
          </h5>
          <p className="mb-0 fs--1 text-white opacity-75">Set your own customized style</p>
        </div>
      </ModalHeader>
      <ScrollBarCustom
        className="modal-body"
        contentProps={{
          renderer: ({ elementRef, ...restProps }) => (
            <span
              {...restProps}
              ref={elementRef}
              className={classNames('p-card position-absolute', { 'border-left': isDark })}
            />
          )
        }}
      >
        <h5 className="fs-0">Color Scheme</h5>
        <p className="fs--1">Choose the perfect color mode for your app.</p>
        <ButtonGroup className="btn-group-toggle btn-block">
          <Button color="theme-default" className={classNames('custom-radio-success', { active: !isDark })}>
            <Label for="theme-mode-default" className="cursor-pointer hover-overlay">
              <img className="w-100" src={defaultModeImg} alt="" />
            </Label>
            <CustomInput
              type="radio"
              id="theme-mode-default"
              label="Light"
              checked={!isDark}
              onChange={({ target }) => setIsDark(!target.checked)}
            />
          </Button>
          <Button color="theme-dark" className={classNames('custom-radio-success', { active: isDark })}>
            <Label for="theme-mode-dark" className="cursor-pointer hover-overlay">
              <img className="w-100" src={darkModeImg} alt="" />
            </Label>
            <CustomInput
              type="radio"
              id="theme-mode-dark"
              label="Dark"
              checked={isDark}
              onChange={({ target }) => setIsDark(target.checked)}
            />
          </Button>
        </ButtonGroup>
        <hr />
        <Flex justify="between">
          <Media className="flex-grow-1">
            <img src={leftArrowFromLeft} alt="" width={20} className="mr-2" />
            <Media body>
              <h5 className="fs-0">RTL Mode</h5>
              <p className="fs--1 mb-0">Switch your language direction </p>
            </Media>
          </Media>
          <CustomInput
            type="switch"
            id="rtl-switch"
            checked={isRTL}
            onChange={({ target }) => setIsRTL(target.checked)}
          />
        </Flex>
        {!isKanban && (
          <>
            <hr />
            <Flex justify="between">
              <Media className="flex-grow-1">
                <img src={arrowsH} alt="" width={20} className="mr-2" />
                <Media body>
                  <h5 className="fs-0">Fluid Layout</h5>
                  <p className="fs--1 mb-0">Toggle container layout system</p>
                </Media>
              </Media>
              <CustomInput
                type="switch"
                id="fluid-switch"
                checked={isFluid}
                onChange={({ target }) => setIsFluid(target.checked)}
              />
            </Flex>
          </>
        )}
        <hr />
        <Media>
          <img src={paragraph} alt="" width={20} className="mr-2" />
          <Media body>
            <Flex align="center" tag="h5" className="fs-0">
              Navigation Position
              <Badge color="success" pill className="badge-soft-success fs--2 ml-2">
                New
              </Badge>
            </Flex>
            <p className="fs--1 mb-2">Select a suitable navigation system for your web application</p>
            <CustomInput
              type="radio"
              id="verticalNav-radio"
              label="Vertical Nav"
              checked={!isTopNav}
              onChange={({ target }) => setIsTopNav(!target.checked)}
              inline
            />
            <CustomInput
              type="radio"
              id="topNav-radio"
              label="Top Nav"
              checked={isTopNav}
              onChange={({ target }) => setIsTopNav(target.checked)}
              inline
            />
          </Media>
        </Media>
        <hr />
        <h5 className="fs-0 d-flex align-items-center">
          Vertical Navbar Style{' '}
          <Badge pill color="soft-success" className="fs--2 ml-2">
            new
          </Badge>
        </h5>
        <p className="fs--1">Switch between styles for your vertical navbar</p>
        <div className="btn-group-toggle btn-block btn-group-navbar-style">
          <ButtonGroup className="btn-block">
            <VerticalNavRadioBtn img={transparent} btnName={'transparent'} />
            <VerticalNavRadioBtn img={invertedImg} btnName={'inverted'} />
          </ButtonGroup>
          <ButtonGroup className="btn-block mt-3">
            <VerticalNavRadioBtn img={card} btnName={'card'} />
            <VerticalNavRadioBtn img={vibrant} btnName={'vibrant'} />
          </ButtonGroup>
        </div>
        <hr />
        <div className="text-center mt-5">
          <img src={settings} alt="settings" width={120} className="mb-4" />
          <h5>Like What You See?</h5>
          <p className="fs--1">Get MyEMS now.</p>
          <Button
            color="primary"
            href="https://meyms.io"
          >
            Purchase
          </Button>
        </div>
      </ScrollBarCustom>
    </Modal>
  );
};

SidePanelModal.propTypes = {
  autoShow: PropTypes.bool,
  showOnce: PropTypes.bool,
  autoShowDelay: PropTypes.number,
  cookieExpireTime: PropTypes.number
};

SidePanelModal.defaultProps = {
  autoShow: true,
  showOnce: true,
  autoShowDelay: 3000,
  cookieExpireTime: 7200000
};

export default SidePanelModal;
