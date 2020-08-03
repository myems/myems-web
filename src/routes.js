import { version } from './config';

// export const homeRoutes = {
//   name: 'Home',
//   to: '/',
//   exact: true,
//   icon: 'chart-pie',
//   children: [
//     {
//       to: '/',
//       name: 'Dashboard',
//       exact: true
//     },
//     { to: '/dashboard-alt', name: 'Dashboard alt' },
//     { to: '/feed', name: 'Feed', exact: true },
//     { to: '/landing', name: 'Landing' }
//   ]
// };

// export const authenticationRoutes = {
//   name: 'Authentication',
//   to: '/authentication',
//   icon: 'lock',
//   children: [
//     {
//       to: '/authentication/basic',
//       name: 'Basic',
//       children: [
//         { to: '/authentication/basic/login', name: 'Login' },
//         { to: '/authentication/basic/logout', name: 'Logout' },
//         { to: '/authentication/basic/register', name: 'Register' },
//         { to: '/authentication/basic/forget-password', name: 'Forgot password' },
//         { to: '/authentication/basic/password-reset', name: 'Reset password' },
//         { to: '/authentication/basic/confirm-mail', name: 'Confirm mail' },
//         { to: '/authentication/basic/lock-screen', name: 'Lock screen' }
//       ]
//     },
//     {
//       to: '/authentication/card',
//       name: 'Card',
//       children: [
//         { to: '/authentication/card/login', name: 'Login' },
//         { to: '/authentication/card/logout', name: 'Logout' },
//         { to: '/authentication/card/register', name: 'Register' },
//         { to: '/authentication/card/forget-password', name: 'Forgot password' },
//         { to: '/authentication/card/password-reset', name: 'Reset password' },
//         { to: '/authentication/card/confirm-mail', name: 'Confirm mail' },
//         { to: '/authentication/card/lock-screen', name: 'Lock screen' }
//       ]
//     },
//     {
//       to: '/authentication/split',
//       name: 'Split',
//       children: [
//         { to: '/authentication/split/login', name: 'Login' },
//         { to: '/authentication/split/logout', name: 'Logout' },
//         { to: '/authentication/split/register', name: 'Register' },
//         { to: '/authentication/split/forget-password', name: 'Forgot password' },
//         { to: '/authentication/split/password-reset', name: 'Reset password' },
//         { to: '/authentication/split/confirm-mail', name: 'Confirm mail' },
//         { to: '/authentication/split/lock-screen', name: 'Lock screen' }
//       ]
//     },
//     {
//       to: '/authentication/wizard',
//       name: 'Wizard'
//     }
//   ]
// };

// export const ECommerceRoutes = {
//   name: 'E commerce',
//   to: '/e-commerce',
//   icon: 'cart-plus',
//   children: [
//     { to: '/e-commerce/products/list', name: 'Product list' },
//     { to: '/e-commerce/products/grid', name: 'Product grid' },
//     { to: '/e-commerce/product-details', name: 'Product details' },
//     { to: '/e-commerce/orders', name: 'Orders' },
//     { to: '/e-commerce/order-details', name: 'Order details' },
//     { to: '/e-commerce/customers', name: 'Customers' },
//     { to: '/e-commerce/shopping-cart', name: 'Shopping cart' },
//     { to: '/e-commerce/checkout', name: 'Checkout' },
//     { to: '/e-commerce/favourite-items', name: 'Favourite items' }
//   ]
// };

// export const pageRoutes = {
//   name: 'Pages',
//   to: '/pages',
//   icon: 'copy',
//   children: [
//     { to: '/pages/activity', name: 'Activity' },
//     { to: '/pages/associations', name: 'Associations' },
//     { to: '/pages/billing', name: 'Billing' },
//     { to: '/pages/customer-details', name: 'Customer details' },
//     { to: '/pages/event-detail', name: 'Event detail' },
//     { to: '/pages/event-create', name: 'Event create' },
//     { to: '/pages/events', name: 'Events' },
//     { to: '/pages/faq', name: 'Faq' },
//     { to: '/pages/invoice', name: 'Invoice' },
//     { to: '/pages/invite-people', name: 'Invite people' },
//     { to: '/pages/notifications', name: 'Notifications' },
//     { to: '/pages/people', name: 'People' },
//     { to: '/pages/pricing', name: 'Pricing' },
//     { to: '/pages/pricing-alt', name: 'Pricing alt' },
//     { to: '/pages/profile', name: 'Profile' },
//     { to: '/pages/settings', name: 'Settings' },
//     { to: '/pages/starter', name: 'Starter' },
//     {
//       to: '/errors',
//       name: 'Errors',
//       children: [{ to: '/errors/404', name: '404' }, { to: '/errors/500', name: '500' }]
//     }
//   ]
// };
// export const widgetsRoutes = {
//   name: 'Widgets',
//   to: '/widgets',
//   exact: true,
//   icon: 'poll'
// };

// export const chatRoutes = {
//   name: 'Chat',
//   to: '/chat',
//   exact: true,
//   icon: 'comments'
// };

// export const kanbanRoutes = {
//   name: 'Kanban',
//   to: '/kanban',
//   exact: true,
//   icon: ['fab', 'trello']
// };

// export const emailRoutes = {
//   name: 'Email',
//   to: '/email',
//   icon: 'envelope-open',
//   children: [
//     { to: '/email/inbox', name: 'Inbox' },
//     { to: '/email/email-detail', name: 'Email detail' },
//     { to: '/email/compose', name: 'Compose' }
//   ]
// };

// export const documentationRoutes = {
//   name: 'Documentation',
//   to: '/documentation',
//   exact: true,
//   icon: 'book'
// };

// export const changelogRoutes = {
//   name: 'ChangeLog',
//   to: '/changelog',
//   exact: true,
//   icon: 'code-branch',
//   badge: {
//     text: `v${version}`,
//     color: 'soft-primary'
//   }
// };

// export const componentRoutes = {
//   name: 'Components',
//   to: '/components',
//   icon: 'puzzle-piece',
//   children: [
//     { to: '/components/alerts', name: 'Alerts' },
//     { to: '/components/accordions', name: 'Accordions' },
//     { to: '/components/avatar', name: 'Avatar' },
//     { to: '/components/badges', name: 'Badges' },
//     { to: '/components/backgrounds', name: 'Backgrounds' },
//     { to: '/components/breadcrumb', name: 'Breadcrumb' },
//     { to: '/components/buttons', name: 'Buttons' },
//     { to: '/components/cards', name: 'Cards' },
//     {
//       to: '/components/cookie-notice',
//       name: 'Cookie notice'
//     },
//     { to: '/components/collapses', name: 'Collapses' },
//     {
//       to: '/components/carousel',
//       name: 'Carousel'
//     },
//     { to: '/components/dropdowns', name: 'Dropdowns' },
//     { to: '/components/forms', name: 'Forms' },
//     { to: '/components/listgroups', name: 'List groups' },
//     { to: '/components/modals', name: 'Modals' },
//     { to: '/components/navs', name: 'Navs' },

//     {
//       to: '/components',
//       name: 'Navbar',
//       children: [
//         { to: '/components/navbars', name: 'Default' },
//         {
//           to: '/components/navbar-vertical',
//           name: 'Vertical',
//           badge: {
//             text: 'New'
//           }
//         },
//         {
//           to: '/components/navbar-top',
//           name: 'Top'
//         }
//       ]
//     },
//     { to: '/components/pageheaders', name: 'Page headers' },
//     { to: '/components/paginations', name: 'Paginations' },
//     { to: '/components/popovers', name: 'Popovers' },
//     { to: '/components/progress', name: 'Progress' },
//     {
//       to: '/components/sidepanel',
//       name: 'Sidepanel'
//     },
//     {
//       to: '/components/spinners',
//       name: 'Spinners'
//     },

//     { to: '/components/tables', name: 'Tables' },
//     { to: '/components/tooltips', name: 'Tooltips' }
//   ]
// };

// export const pluginRoutes = {
//   name: 'Plugins',
//   to: '/plugins',
//   icon: 'plug',
//   children: [
//     { to: '/plugins/bulk-select', name: 'Bulk select' },
//     {
//       to: '/plugins/react-beautiful-dnd',
//       name: 'Beautiful DnD'
//     },
//     {
//       to: '/plugins',
//       name: 'Chart',
//       children: [{ to: '/plugins/chart', name: 'Chart Js' }, { to: '/plugins/echarts', name: 'Echarts' }]
//     },
//     { to: '/plugins/countup', name: 'Countup' },
//     { to: '/plugins/code-highlight', name: 'Code Highlight' },
//     { to: '/plugins/datetime', name: 'Datetime' },
//     { to: '/plugins/dropzone', name: 'Dropzone' },
//     { to: '/plugins/emoji-mart', name: 'Emoji Mart' },
//     { to: '/plugins/fontawesome', name: 'Fontawesome' },
//     { to: '/plugins/image-lightbox', name: 'Image lightbox' },
//     { to: '/plugins/lottie', name: 'Lottie' },
//     {
//       to: '/plugins',
//       name: 'Map',
//       children: [
//         { to: '/plugins/leaflet-map', name: 'Leaflet map' },
//         { to: '/plugins/google-map', name: 'Google map' },
//         { to: '/plugins/echart-map', name: 'Echart Map' }
//       ]
//     },
//     { to: '/plugins/plyr', name: 'Plyr' },
//     { to: '/plugins/progressbar', name: 'Progressbar' },
//     { to: '/plugins/react-hook-form', name: 'React Hook Form' },
//     {
//       to: '/plugins/react-bootstrap-table2',
//       name: 'BS Table2'
//     },
//     { to: '/plugins/select', name: 'Select' },
//     { to: '/plugins/slick-carousel', name: 'Slick Carousel' },
//     { to: '/plugins/scroll-bar', name: 'Scroll Bar' },
//     { to: '/plugins/toastify', name: 'Toastify' },
//     { to: '/plugins/typed', name: 'Typed' },
//     { to: '/plugins/wysiwyg', name: 'WYSIWYG editor' }
//   ]
// };

// export const utilityRoutes = {
//   name: 'Utilities',
//   to: '/utilities',
//   icon: ['fab', 'hotjar'],
//   children: [
//     { to: '/utilities/borders', name: 'Borders' },
//     { to: '/utilities/clearfix', name: 'Clearfix' },
//     { to: '/utilities/closeIcon', name: 'Close icon' },
//     { to: '/utilities/colors', name: 'Colors' },
//     { to: '/utilities/display', name: 'Display' },
//     { to: '/utilities/embed', name: 'Embed' },
//     { to: '/utilities/figures', name: 'Figures' },
//     { to: '/utilities/flex', name: 'Flex' },
//     { to: '/utilities/grid', name: 'Grid' },
//     { to: '/utilities/sizing', name: 'Sizing' },
//     { to: '/utilities/spacing', name: 'Spacing' },
//     { to: '/utilities/stretchedLink', name: 'Stretched link' },
//     { to: '/utilities/typography', name: 'Typography' },
//     { to: '/utilities/verticalAlign', name: 'Vertical align' },
//     { to: '/utilities/visibility', name: 'Visibility' }
//   ]
// };

export const dashboardRoutes = {
  name: '概览',
  to: '/dashboard',
  exact: true,
  icon: 'chart-pie'
};

export const spaceRoutes = {
  name: '空间数据',
  to: '/space',
  icon: 'chart-pie',
  exact: true,
  children: [
    { to: '/space/energycategory', name: '空间能耗分析'},
    { to: '/space/energyitem', name: '空间能耗分项分析' },
    { to: '/space/cost', name: '空间成本分析' },
    { to: '/space/output', name: '空间产出分析' },
    { to: '/space/income', name: '空间收入分析' },
    { to: '/space/efficiency', name: '空间效率分析' },
    { to: '/space/load', name: '空间负荷分析' },
    { to: '/space/statistics', name: '空间统计分析' },
    { to: '/space/fault', name: '空间故障分析' },
    { to: '/space/saving', name: '空间节能分析' },
  ]
};

export const equipmentRoutes = {
  name: '设备数据',
  to: '/equipment',
  icon: 'chart-pie',
  children: [
    { to: '/equipment/energycategory', name: '设备能耗分析' },
    { to: '/equipment/cost', name: '设备成本分析' },
    { to: '/equipment/output', name: '设备产出分析' },
    { to: '/equipment/income', name: '设备收入分析' },
    { to: '/equipment/efficiency', name: '设备效率分析' },
    { to: '/equipment/load', name: '设备负荷分析' },
    { to: '/equipment/statistics', name: '设备统计分析' },
    { to: '/equipment/fault', name: '设备故障分析' },
    { to: '/equipment/saving', name: '设备节能分析' },
    { to: '/equipment/tracking', name: '设备台账' },
  ]
};

export const meterRoutes = {
  name: '计量表数据',
  to: '/meter',
  icon: 'chart-pie',
  children: [
    { to: '/meter/meterenergy', name: '计量表能耗分析' },
    { to: '/meter/metercost', name: '计量表成本分析' },
    { to: '/meter/metertrend', name: '计量表趋势分析' },
    { to: '/meter/meterrealtime', name: '计量表实时分析' },
    { to: '/meter/virtualmeterenergy', name: '虚拟表能耗分析' },
    { to: '/meter/virtualmetercost', name: '虚拟表成本分析' },
    { to: '/meter/offlinemeterenergy', name: '离线表能耗分析' },
    { to: '/meter/offlinemetercost', name: '离线表成本分析' },
    { to: '/meter/tracking', name: '计量表台账' },
  ]
};

export const tenantRoutes = {
  name: '租户数据',
  to: '/tenant',
  icon: 'chart-pie',
  children: [
    { to: '/tenant/energycategory', name: '租户能耗分析' },
    { to: '/tenant/cost', name: '租户成本分析' },
    { to: '/tenant/load', name: '租户负荷分析' },
    { to: '/tenant/statistics', name: '租户统计分析' },
    { to: '/tenant/fault', name: '租户故障分析' },
    { to: '/tenant/saving', name: '租户节能分析' },
    { to: '/tenant/bill', name: '租户账单' },
  ]
};

export const storeRoutes = {
  name: '门店数据',
  to: '/store',
  icon: 'chart-pie',
  children: [
    { to: '/store/energycategory', name: '门店能耗分析' },
    { to: '/store/cost', name: '门店成本分析' },
    { to: '/store/load', name: '门店负荷分析' },
    { to: '/store/statistics', name: '门店统计分析' },
    { to: '/store/fault', name: '门店故障分析' },
    { to: '/store/saving', name: '门店节能分析' },
  ]
};

export const shopfloorRoutes = {
  name: '车间数据',
  to: '/shopfloor',
  icon: 'chart-pie',
  children: [
    { to: '/shopfloor/energycategory', name: '车间能耗分析' },
    { to: '/shopfloor/cost', name: '车间成本分析' },
    { to: '/shopfloor/load', name: '车间负荷分析' },
    { to: '/shopfloor/statistics', name: '车间统计分析' },
    { to: '/shopfloor/fault', name: '车间故障分析' },
    { to: '/shopfloor/saving', name: '车间节能分析' },
  ]
};

export const auxiliarySystemRoutes = {
  name: '辅助系统数据',
  to: '/auxiliarysystem',
  icon: 'chart-pie',
  children: [
    { to: '/auxiliarysystem/energyflowdiagram', name: '企业能流图' },
    { to: '/auxiliarysystem/distributionsystem', name: '配电系统' },
    { to: '/auxiliarysystem/chillerplant', name: '冷站数据分析' },
    { to: '/auxiliarysystem/boilerroom', name: '锅炉房数据分析' },
  ]
};

export const fddRoutes = {
  name: '故障检测与诊断',
  to: '/fdd',
  icon: 'chart-pie',
  children: [
    { to: '/fdd/statistics', name: '故障统计分析' },
    { to: '/fdd/space', name: '空间故障分析' },
    { to: '/fdd/equipment', name: '设备故障分析' },
    { to: '/fdd/tenant', name: '租户故障分析' },
    { to: '/fdd/store', name: '门店故障分析' },
    { to: '/fdd/shopfloor', name: '车间故障分析' },
    { to: '/fdd/energyloss', name: '能源损耗分析' },
  ]
};
export const monitoringRoutes = {
  name: '设备监控',
  to: '/monitoring',
  icon: 'chart-pie',
  children: [
    { to: '/monitoring/spaceequipments', name: '空间设备监控' },
    { to: '/monitoring/tenantequipments', name: '租户设备监控' },
    { to: '/monitoring/storeequipments', name: '门店设备监控' },
    { to: '/monitoring/shopfloorequipments', name: '车间设备监控' },
  ]
};

export const advancedReportingRoutes = {
  name: '高级报表',
  to: '/advancedreporting',
  exact: true,
  icon: 'book'
};

export const knowledgeBaseRoutes = {
  name: '知识库',
  to: '/knowledgebase',
  exact: true,
  icon: 'book'
};

export default [
  // homeRoutes,
  // pageRoutes,
  // chatRoutes,
  // kanbanRoutes,
  // emailRoutes,
  // authenticationRoutes,
  // ECommerceRoutes,
  // widgetsRoutes,
  // componentRoutes,
  // utilityRoutes,
  // pluginRoutes,
  // documentationRoutes,
  // changelogRoutes,
  dashboardRoutes,
  spaceRoutes,
  equipmentRoutes,
  meterRoutes,
  tenantRoutes,
  storeRoutes,
  shopfloorRoutes,
  auxiliarySystemRoutes,
  fddRoutes,
  monitoringRoutes,
  advancedReportingRoutes,
  knowledgeBaseRoutes
];
