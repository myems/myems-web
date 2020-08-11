import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      // routes
      "Dashboard": "Dashboard",
      "Space Data": "Space Data",
      "Equipment Data": "Equipment Data",
      "Meter Data": "Meter Data",
      "Tenant Data": "Tenant Data",
      "Store Data": "Store Data",
      "Shopfloor Data": "Shopfloor Data",
      "Combined Equipment Data": "Combined Equipment Data",
      "Auxiliary System": "Auxiliary System",
      "Fault Detection & Diagnostics": "FDD",
      "Advanced Reporting": "Advanced Reporting",
      "Knowledge Base": "Knowledge Base",
      "Energy Category": "Energy Category",
      "Energy Item": "Energy Item",
      "Cost": "Cost",
      "Output": "Output",
      "Income": "Income",
      "Efficiency": "Efficiency",
      "Load": "Load",
      "Statistics": "Statistics",
      "Saving": "Saving",
      "Equipment Tracking": "Equipment Tracking",
      "Meter Energy": "Meter Energy",
      "Meter Cost": "Meter Cost",
      "Meter Trend": "Meter Trend",
      "Meter Realtime": "Meter Realtime",
      "Virtual Meter Energy": "Virtual Meter Energy",
      "Virtual Meter Cost": "Virtual Meter Cost",
      "Offline Meter Energy": "Offline Meter Energy",
      "Offline Meter Cost": "Offline Meter Cost",
      "Meter Tracking": "Meter Tracking",
      "Tenant Bill": "Tenant Bill",
      "Fault Statistics": "Fault Statistics",
      "Space Faults": "Space Faults",
      "Equipment Faults": "Equipment Faults",
      "Combined Eequipment Faults": "Combined Eequipment Faults",
      "Tenant Faults": "Tenant Faults",
      "Store Faults": "Store Faults",
      "Shopfloor Faults": "Shopfloor Faults",
      "Energy Loss": "Energy Loss",
      "Space Equipments": "Space Equipments",
      "Conbined Equipments": "Conbined Equipments",
      "Tenant Equipments": "Tenant Equipments",
      "Store Equipments": "Store Equipments",
      "Shopfloor Equipments": "Shopfloor Equipments",
      // Dashboard
      "Related Parameters": "Related Parameters",
      "Welcome to": "Welcome to",
      "the Leading Free and Open Source Energy Management System": "the Leading Free and Open Source Energy Management System",

    }
  },
  zh: {
    translation: {
      // routes
      "Dashboard": "概览",
      "Space Data": "空间数据",
      "Equipment Data": "设备数据",
      "Meter Data": "计量表数据",
      "Tenant Data": "租户数据",
      "Store Data": "门店数据",
      "Shopfloor Data": "车间数据",
      "Combined Equipment Data": "组合设备数据",
      "Auxiliary System": "辅助系统",
      "Fault Detection & Diagnostics": "故障检测与诊断",
      "Monitoring & Control": "设备监控",
      "Advanced Reporting": "高级报表",
      "Knowledge Base": "知识库",
      "Energy Category": "能耗分类分析",
      "Energy Item": "能耗分项分析",
      "Cost": "成本分析",
      "Output": "产出分析",
      "Income": "收入分析",
      "Efficiency": "效率分析",
      "Load": "负荷分析",
      "Statistics": "统计分析",
      "Saving": "节能分析",
      "Equipment Tracking": "设备台账",
      "Energy": "能耗分析",
      "Meter Energy": "计量表能耗分析",
      "Meter Cost": "计量表成本分析",
      "Meter Trend": "计量表趋势分析",
      "Meter Realtime": "计量表实时分析",
      "Virtual Meter Energy": "虚拟表能耗分析",
      "Virtual Meter Cost": "虚拟表成本分析",
      "Offline Meter Energy": "离线表能耗分析",
      "Offline Meter Cost": "离线表成本分析",
      "Meter Tracking": "计量表台账",
      "Tenant Bill": "租户账单",
      "Fault Statistics": "故障统计分析",
      "Space Faults": "空间故障分析",
      "Equipment Faults": "设备故障分析",
      "Combined Eequipment Faults": "组合设备故障分析",
      "Tenant Faults": "租户故障分析",
      "Store Faults": "门店故障分析",
      "Shopfloor Faults": "车间故障分析",
      "Energy Loss": "能源损耗分析",
      "Space Equipments": "空间设备",
      "Conbined Equipments": "组合设备",
      "Tenant Equipments": "租户设备",
      "Store Equipments": "门店设备",
      "Shopfloor Equipments": "车间设备",
      // Dashboard
      "Related Parameters": "相关参数",
      "Welcome to": '欢迎使用',
      "the Leading Free and Open Source Energy Management System": "领先的免费开源能源管理系统",

    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;