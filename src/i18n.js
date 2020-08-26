import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      // routes
      "Dashboard": "Dashboard",
      "Space Data": "Space",
      "Equipment Data": "Equipment",
      "Meter Data": "Meter",
      "Tenant Data": "Tenant",
      "Store Data": "Store",
      "Shopfloor Data": "Shopfloor",
      "Combined Equipment Data": "Combined Equipment",
      "Auxiliary System": "Auxiliary System",
      "Fault Detection & Diagnostics": "FDD",
      "Monitoring": "Monitoring",
      "Advanced Reporting": "Advanced Reporting",
      "Knowledge Base": "Knowledge Base",
      "Energy Category Data": "Energy Category",
      "Energy Item Data": "Energy Item",
      "Cost": "Cost",
      "Output": "Output",
      "Income": "Income",
      "Efficiency": "Efficiency",
      "Load": "Load",
      "Statistics": "Statistics",
      "Saving": "Saving",
      "Equipment Tracking": "Equipment Tracking",
      "Equipment List": "Equipment List",
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
      "Energy Flow Diagram": "Energy Flow Diagram",
      "Distribution System":"Distribution System",
      "Fault Statistics": "Fault Statistics",
      "Space Faults": "Space Faults",
      "Equipment Faults": "Equipment Faults",
      "Combined Equipment Faults": "Combined Eequipment Faults",
      "Tenant Faults": "Tenant Faults",
      "Store Faults": "Store Faults",
      "Shopfloor Faults": "Shopfloor Faults",
      "Energy Loss": "Energy Loss",
      "Space Equipments": "Space Equipments",
      "Combined Equipments": "Combined Equipments",
      "Tenant Equipments": "Tenant Equipments",
      "Store Equipments": "Store Equipments",
      "Shopfloor Equipments": "Shopfloor Equipments",
      // Dashboard
      "Welcome to": "Welcome to",
      "The Leading Free and Open Source Energy Management System": "The Leading Free and Open Source Energy Management System",
      "Costs by Energy Category": "Costs by Energy Category",
      "Ton of Standard Coal by Energy Category": "Ton of Standard Coal by Energy Category",
      "Carbon Dioxide Emissions by Energy Category": "Carbon Dioxide Emissions by Energy Category",
      "This Month's Consumption CATEGORY VALUE UNIT": "This Month's Consumption {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "This Year's Costs CATEGORY UNIT": "This Year's Costs {{CATEGORY}} {{UNIT}}",
      "This Year's Consumption CATEGORY UNIT": "This Year's Consumption {{CATEGORY}} {{UNIT}}",
      // Entities
      "Space": "Space",
      "Equipment": "Equipment",
      "Meter": "Meter",
      "Offline Meter": "Offline Meter",
      "Virtual Meter": "Virtual Meter",
      "Tenant": "Tenant",
      "Store": "Store",
      "Shopfloor": "Shopfloor",
      "Combined Equipment": "Combined Equipment",
      "Cost Center": "Cost Center",
      "Name": "Name",
      "Description": "Description",
      "Energy Category": "Energy Category",
      // SidePanelModal
      "Settings": "Settings",
      "Set your own customized style": "Set your own customized style",
      "Color Scheme": "Color Scheme",
      "Choose the perfect color mode for your app.": "Choose the perfect color mode for your app.",
      "Light": "Light",
      "Dark": "Dark",
      "RTL Mode": "RTL Mode",
      "Switch your language direction": "Switch your language direction",
      "Fluid Layout": "Fluid Layout",
      "Toggle container layout system": "Toggle container layout system",
      "Navigation Position": "Navigation Position",
      "Select a suitable navigation system for your web application": "Select a suitable navigation system for your web application",
      "Vertical Nav": "Vertical Nav",
      "Top Nav": "Top Nav",
      "Vertical Navbar Style": "Vertical Navbar Style",
      "Switch between styles for your vertical navbar": "Switch between styles for your vertical navbar",
      "Language": "Language",
      "Switch between languages": "Switch between languages",
      "language-zh_cn": "简体中文",
      "language-en": "English",
      "language-de": "Deutsch",
      "Like What You See?": "Like What You See?",
      "Get MyEMS now.": "Get MyEMS now.",
      "Purchase": "Purchase",
      // Query Panel
      "Base Period Begins": "Base Period Begins",
      "Base Period Ends": "Base Period Ends",
      "Comparison Types": "Comparison Types",
      "Year-Over-Year": "Year-Over-Year",
      "Month-On-Month": "Month-On-Month",
      "Free Comparison": "Free Comparison",
      "None Comparison": "None Comparison",
      "Reporting Period Begins": "Reporting Period Begins",
      "Reporting Period Ends": "Reporting Period Ends",
      "(Optional)": "(Optional)",
      "Period Types": "Period Types",
      "Yearly": "Yearly",
      "Monthly": "Monthly",
      "Daily": "Daily",
      "Hourly": "Hourly",
      "Submit": "Submit",
      //Card Summaries and Line Charts
      "Base Period": "Base Period",
      "Reporting Period": "Reporting Period",
      "Per Unit Area": "Per Unit Area",
      "Per Unit Production": "Per Unit Production",
      "Baseline Value - Actual Value": "Baseline - Actual",
      "Average Load": "Average Load",
      "Maximum Load": "Maximum Load",
      "Load Factor": "Load Factor",
      "Ratio of Average Load to Maximum Load": "Ratio of Average Load to Maximum Load",
      "Reporting Period Consumption CATEGORY UNIT": "Reporting Period Consumption {{CATEGORY}} {{UNIT}}",
      "EQUIPMENT Reporting Period Consumption CATEGORY UNIT": "{{EQUIPMENT}} Reporting Period Consumption {{CATEGORY}} {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Consumption CATEGORY UNIT": "{{COMBINED_EQUIPMENT}} Reporting Period Consumption {{CATEGORY}} {{UNIT}}",
      "Reporting Period Consumption CATEGORY VALUE UNIT": "Reporting Period Consumption {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Consumption CATEGORY VALUE UNIT": "Base Period Consumption {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Consumption ITEM CATEGORY UNIT": "Reporting Period Consumption {{ITEM}} ({{CATEGORY}}) {{UNIT}}",
      "Reporting Period Consumption ITEM CATEGORY VALUE UNIT": "Reporting Period Consumption {{ITEM}} ({{CATEGORY}} {{VALUE}}) {{UNIT}}",
      "Base Period Consumption ITEM CATEGORY VALUE UNIT": "Base Period Consumption {{ITEM}} ({{CATEGORY}}) {{VALUE}} {{UNIT}}",
      "Reporting Period Costs CATEGORY UNIT": "Reporting Period Costs {{CATEGORY}} {{UNIT}}",
      "Reporting Period Costs CATEGORY VALUE UNIT": "Reporting Period Costs {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Costs CATEGORY VALUE UNIT": "Base Period Costs {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Output CATEGORY UNIT": "Reporting Period Output {{CATEGORY}} {{UNIT}}",
      "EQUIPMENT Reporting Period Output CATEGORY UNIT": "{{EQUIPMENT}} Reporting Period Output {{CATEGORY}} {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Output CATEGORY UNIT": "{{COMBINED_EQUIPMENT}} Reporting Period Output {{CATEGORY}} {{UNIT}}",
      "Reporting Period Output CATEGORY VALUE UNIT": "Reporting Period Output {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Output CATEGORY VALUE UNIT": "Base Period Output {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Income CATEGORY UNIT": "Reporting Period Income {{CATEGORY}} {{UNIT}}",
      "Reporting Period Income CATEGORY VALUE UNIT": "Reporting Period Income {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Income CATEGORY VALUE UNIT": "Base Period Income {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Total Income UNIT": "Reporting Period Total Income {{UNIT}}",
      "Reporting Period Cumulative Efficiency UNIT": "Reporting Period Cumulative Efficiency {{UNIT}}",
      "EQUIPMENT Reporting Period Cumulative Efficiency UNIT": "{{EQUIPMENT}} Reporting Period Cumulative Efficiency {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Cumulative Comprehensive Efficiency UNIT": "{{COMBINED_EQUIPMENT}} Reporting Period Cumulative Comprehensive Efficiency {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Cumulative Comprehensive Efficiency VALUE UNIT": "{{COMBINED_EQUIPMENT}} Reporting Period Cumulative Comprehensive Efficiency {{VALUE}} {{UNIT}}",
      "COMBINED_EQUIPMENT Base Period Cumulative Comprehensive Efficiency VALUE UNIT": "{{COMBINED_EQUIPMENT}} Base Period Cumulative Comprehensive Efficiency {{VALUE}} {{UNIT}}",
      "Instantaneous Efficiency UNIT": "Instantaneous Efficiency {{UNIT}}",
      "EQUIPMENT Instantaneous Efficiency UNIT": "{{EQUIPMENT}} Instantaneous Efficiency {{UNIT}}",
      "COMBINED_EQUIPMENT Instantaneous Comprehensive Efficiency UNIT": "{{COMBINED_EQUIPMENT}} Instantaneous Comprehensive Efficiency {{UNIT}}",
      "Reporting Period Cumulative Efficiency VALUE UNIT": "Reporting Period Cumulative Efficiency {{VALUE}} {{UNIT}}",
      "Base Period Cumulative Efficiency VALUE UNIT": "Base Period Cumulative Efficiency {{VALUE}} {{UNIT}}",
      "Reporting Period CATEGORY Maximum Load UNIT": "Reporting Period {{CATEGORY}} Maximum Load {{UNIT}}",
      "Reporting Period CATEGORY Average Load UNIT": "Reporting Period {{CATEGORY}} Average Load {{UNIT}}",
      "Reporting Period CATEGORY Load Factor": "Reporting Period {{CATEGORY}} Load Factor",
      "Reporting Period CATEGORY Average Load VALUE UNIT": "Reporting Period {{CATEGORY}} Average Load {{VALUE}} {{UNIT}}",
      "Base Period CATEGORY Average Load VALUE UNIT": "Base Period {{CATEGORY}} Average Load {{VALUE}} {{UNIT}}",
      "Reporting Period CATEGORY Maximum Value UNIT": "Reporting Period {{CATEGORY}} Maximum Value {{UNIT}}",
      "Reporting Period CATEGORY Minimum Value UNIT": "Reporting Period {{CATEGORY}} Minimum Value {{UNIT}}",
      "Reporting Period CATEGORY Average Value UNIT": "Reporting Period {{CATEGORY}} Average Value {{UNIT}}",
      "Reporting Period Savings CATEGORY (Baseline - Actual) UNIT": "Reporting Period Savings {{CATEGORY}} (Baseline - Actual) {{UNIT}}",
      "Reporting Period Decreased CATEGORY (Baseline - Actual) UNIT": "Reporting Period Decreased {{CATEGORY}} (Baseline - Actual) {{UNIT}}",
      "Reporting Period Savings CATEGORY VALUE UNIT": "Reporting Period Savings {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Savings CATEGORY VALUE UNIT": "Base Period Savings {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Trend Values": "Trend Values",
      //FDD
      "Fault List": "Fault List",
      "Reporting Period Number of Fault VALUE": "Reporting Period Number of Fault {{VALUE}}",
      "Number of All Faults": "Number of All Faults",
      "Number of Space Faults": "Number of Space Fautls",
      "Number of Equipment Faults": "Number of Equipment Faults",
      "Number of Tenant Faults": "Number of Tenant Faults",
      "Number of Store Faults": "Number of Store Faults",
      "Number of Shopfloor Faults": "Number of Shopfloor Faults",
      "Number of Combined Equipment Faults": "Number of Combined Equipment Faults",
      "Reporting Period Lost CATEGORY UNIT": "Reporting Period Lost {{CATEGORY}} {{UNIT}}",
      "Reporting Period Lost CATEGORY VALUE UNIT": "Reporting Period Lost {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Upstream Meter": "Upstream Meter",
      //Data Panels
      "Related Parameters": "Related Parameters",
      "Detailed Data": "Detailed Data",
      "Child Spaces Data": "Child Spaces Data",
      "Child Spaces Data of This Month": "Child Spaces Data of This Month",
      "This Year": "This Year",
      "This Month": "This Month",
      "This Day": "This Day",
      "Total": "Total",
      "No data found": "No data found",
      "Export": "Export",
      //Realtime Chart
      "Realtime Value of Energy Value Point UNIT": "Realtime Value of Energy Value Point {{UNIT}}",
      "Realtime Value": "Realtime Value",
      //Meter Tracking
      "Meter List": "Meter List",
      //Profile Dropdown
      "Feedback": "Feedback",
      "Account Settings": "Account Settings",
      "Logout": "Logout",
      //Authentication
      "Log in": "Log in",
      "Email address": "Email address",
      "Password": "Password",
      "Remember me": "Remember me",
      "Logged in as ": "Logged in as ",
      "Forget Password?": "Forget Password?",
      "Forgot your password?": "Forgot your password?",
      "Enter your email and we'll send you a reset link.": "Enter your email and we'll send you a reset link.",
      "Send reset link": "Send reset link",
      "Thanks for using MyEMS!": "Thanks for using MyEMS!",
      "You are now successfully signed out.": "You are now successfully signed out.",
      "Return to Login": "Return to Login",
      "Please check your email!": "Please check your email!",
      "An email has been sent to ": "An email has been sent to ",
      "Please click on the included link to reset your password.": "Please click on the included link to reset your password.",
      "An email with password reset link is sent to ": "An email with password reset link is sent to ",
      "Change Password": "Change Password",
      "Old Password": "Old Password",
      "New Password": "New Password",
      "Confirm Password": "Confirm Password",
      "Update Password": "Update Password",
      "Password has been changed!": "Password has been changed!",
      //notification
      "Notifications": "Notifications",
      "Mark all as read": "Mark all as read",
      "View all": "View all",
      "notification_NEW": "NEW",
      "notification_EARLIER": "EARLIER",
      "Notification List": "Notification List",
      //Monitoring
      "Run Commands": "Run Commands",
      "Fault Alarms": "Fault Alarms",
      "Instantaneous Efficiency VALUE UNIT": "Instantaneous Efficiency {{VALUE}} {{UNIT}}",
      "Communication Online": "Online",
      "Communication Offline": "Offline",
      "Equipment Running": "Running",
      "Equipment Stopped": "Stopped",
      "Show Up to": "Show Up to",
      "All": "All",
      "FROM - TO of TOTAL Equipments": "{{FROM}} - {{TO}} of {{TOTAL}} Equipments",
      //Advanced Reporting & Knowledge base
      "Created Datetime": "Created Datetime",
      "File Format": "File Format",
      "File Size": "File Size",
      "Uploader": "Uploader",
      //Error
      "The page you're looking for is not found.": "The page you're looking for is not found.",
      "Make sure the address is correct and that the page hasn't moved. ": "Make sure the address is correct and that the page hasn't moved. ",
      "If you think this is a mistake,": "If you think this is a mistake,",
      "contact us": "contact us",
      "Take me home": "Take me home",
      "Whoops, something went wrong!": "Whoops, something went wrong!",
      "Try refreshing the page, or going back and attempting the action again. ": "Try refreshing the page, or going back and attempting the action again. ",
      "If this problem persists,": "If this problem persists,",
      //Tenant Bill
      "Lease Contract Number": "Lease Contract Number",
      "Download": "Download",
      "Print": "Print",
      "Payment Notice": "Payment Notice",
      "Bill To": "Bill To",
      "Bill Number": "Bill Number",
      "Bill Date": "Bill Date",
      "Payment Due Date": "Payment Due Date",
      "Amount Payable": "Amount Payable",
      "Billing Period Start": "Billing Period Start",
      "Billing Period End": "Billing Period End",
      "Quantity": "Quantity",
      "Price": "Price",
      "Amount": "Amount",
      "Subtotal": "Subtotal",
      "VAT Output Tax": "VAT Output Tax",
      "Total Amount Payable": "Total Amount Payable",
      "Please make sure to pay on or before the payment due date above":"Please make sure to pay on or before the payment due date above",
      "Send money to the following account": "Send money to the following account",
      "Account Name": "Account Name",
      "Bank Name": "Bank Name",
      "Bank Address": "Bank Address",
      "RMB Account": "RMB Account",
    }
  },
  zh_cn: {
    translation: {
      // routes
      "Dashboard": "总览",
      "Space Data": "空间数据",
      "Equipment Data": "设备数据",
      "Meter Data": "计量表数据",
      "Tenant Data": "租户数据",
      "Store Data": "门店数据",
      "Shopfloor Data": "车间数据",
      "Combined Equipment Data": "组合设备数据",
      "Auxiliary System": "辅助系统",
      "Fault Detection & Diagnostics": "故障检测与诊断",
      "Monitoring": "设备监控",
      "Advanced Reporting": "高级报表",
      "Knowledge Base": "知识库",
      "Energy Category Data": "能耗分类分析",
      "Energy Item Data": "能耗分项分析",
      "Cost": "成本分析",
      "Output": "产出分析",
      "Income": "收入分析",
      "Efficiency": "效率分析",
      "Load": "负荷分f析",
      "Statistics": "统计分析",
      "Saving": "节能分析",
      "Equipment Tracking": "设备台账",
      "Equipment List": "设备列表",
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
      "Energy Flow Diagram": "能流图",
      "Distribution System": "配电系统",
      "Fault Statistics": "故障统计分析",
      "Space Faults": "空间故障分析",
      "Equipment Faults": "设备故障分析",
      "Combined Equipment Faults": "组合设备故障分析",
      "Tenant Faults": "租户故障分析",
      "Store Faults": "门店故障分析",
      "Shopfloor Faults": "车间故障分析",
      "Energy Loss": "能源损耗分析",
      "Space Equipments": "空间设备",
      "Combined Equipments": "组合设备",
      "Tenant Equipments": "租户设备",
      "Store Equipments": "门店设备",
      "Shopfloor Equipments": "车间设备",
      // Dashboard
      "Welcome to": '欢迎使用',
      "The Leading Free and Open Source Energy Management System": "领先的免费开源能源管理系统",
      "Costs by Energy Category": "成本占比",
      "Ton of Standard Coal by Energy Category": "吨标准煤占比",
      "Carbon Dioxide Emissions by Energy Category": "二氧化碳排放占比",
      "This Month's Consumption CATEGORY VALUE UNIT": "本月消耗 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "This Year's Costs CATEGORY UNIT": "本年{{CATEGORY}}成本 {{UNIT}}",
      "This Year's Consumption CATEGORY UNIT": "本年消耗 {{CATEGORY}} {{UNIT}}",
      // Entities
      "Space": "空间",
      "Equipment": "设备",
      "Meter": "计量表",
      "Offline Meter": "离线表",
      "Virtual Meter": "虚拟表",
      "Tenant": "租户",
      "Store": "门店",
      "Shopfloor": "车间",
      "Combined Equipment": "组合设备",
      "Cost Center": "成本中心",
      "Name": "名称",
      "Description": "描述",
      "Energy Category": "能耗分类",
      // SidePanelModal
      "Settings": "设置",
      "Set your own customized style": "设置您的自定义样式",
      "Color Scheme": "配色方案",
      "Choose the perfect color mode for your app.": "为您的应用选择理想的色彩模式。",
      "Light": "亮色",
      "Dark": "暗色",
      "RTL Mode": "RTL模式",
      "Switch your language direction": "改变你的语言方向",
      "Fluid Layout": "流动布局",
      "Toggle container layout system": "切换容器布局系统",
      "Navigation Position": "导航栏位置",
      "Select a suitable navigation system for your web application": "为您的web应用程序选择合适的导航栏系统",
      "Vertical Nav": "垂直导航栏",
      "Top Nav": "顶部导航栏",
      "Vertical Navbar Style": "垂直导航栏样式",
      "Switch between styles for your vertical navbar": "切换垂直导航栏的样式",
      "Language": "语言",
      "Switch between languages": "切换语言",
      "language-zh_cn": "简体中文",
      "language-en": "English",
      "language-de": "Deutsch",
      "Like What You See?": "喜欢这个系统?",
      "Get MyEMS now.": "立即获取MyEMS。",
      "Purchase": "购买",
      // Query Panel
      "Base Period Begins": "基准期开始",
      "Base Period Ends": "基准期结束",
      "Comparison Types": "比较类型",
      "Year-Over-Year": "上年同比",
      "Month-On-Month": "上月环比",
      "Free Comparison": "自由比",
      "None Comparison": "不比",
      "Reporting Period Begins": "报告期开始",
      "Reporting Period Ends": "报告期结束",
      "(Optional)": "(可选)",
      "Period Types": "时间尺度",
      "Yearly": "年",
      "Monthly": "月",
      "Daily": "日",
      "Hourly": "时",
      "Submit": "提交",
      //Card Summaries and Line Charts
      "Base Period": "基准期",
      "Reporting Period": "报告期",
      "Per Unit Area": "单位面积值",
      "Per Unit Production": "单位产品值",
      "Baseline Value - Actual Value": "基线值-实际值",
      "Average Load": "平均负荷",
      "Maximum Load": "最大负荷",
      "Load Factor": "负荷系数",
      "Ratio of Average Load to Maximum Load": "平均负荷与最大负荷的比值",
      "Reporting Period Consumption CATEGORY UNIT": "报告期消耗 {{CATEGORY}} {{UNIT}}",
      "EQUIPMENT Reporting Period Consumption CATEGORY UNIT": "{{EQUIPMENT}} 报告期消耗 {{CATEGORY}} {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Consumption CATEGORY UNIT": "{{COMBINED_EQUIPMENT}} 报告期消耗 {{CATEGORY}} {{UNIT}}",
      "Reporting Period Consumption CATEGORY VALUE UNIT": "报告期消耗 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Consumption CATEGORY VALUE UNIT": "基准期消耗 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Consumption ITEM CATEGORY UNIT": "报告期消耗 {{ITEM}} ({{CATEGORY}}) {{UNIT}}",
      "Reporting Period Consumption ITEM CATEGORY VALUE UNIT": "报告期消耗 {{ITEM}} ({{CATEGORY}}) {{VALUE}} {{UNIT}}",
      "Base Period Consumption ITEM CATEGORY VALUE UNIT": "基准期消耗 {{ITEM}} ({{CATEGORY}}) {{VALUE}} {{UNIT}}",
      "Reporting Period Costs CATEGORY UNIT": "报告期成本 {{CATEGORY}} {{UNIT}}",
      "Reporting Period Costs CATEGORY VALUE UNIT": "报告期成本 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Costs CATEGORY VALUE UNIT": "基准期成本 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Output CATEGORY UNIT": "报告期产出 {{CATEGORY}} {{UNIT}}",
      "EQUIPMENT Reporting Period Output CATEGORY UNIT": "{{EQUIPMENT}} 报告期产出 {{CATEGORY}} {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Output CATEGORY UNIT": "{{COMBINED_EQUIPMENT}} 报告期产出 {{CATEGORY}} {{UNIT}}",
      "Reporting Period Output CATEGORY VALUE UNIT": "报告期产出 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Output CATEGORY VALUE UNIT": "基准期产出 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Income CATEGORY UNIT": "报告期收入 {{CATEGORY}} {{UNIT}}",
      "Reporting Period Income CATEGORY VALUE UNIT": "报告期收入 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Income CATEGORY VALUE UNIT": "基准期收入 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Reporting Period Total Income UNIT": "报告期总收入 {{UNIT}}",
      "Reporting Period Cumulative Efficiency UNIT": "报告期累积效率 {{UNIT}}",
      "EQUIPMENT Reporting Period Cumulative Efficiency UNIT": "{{EQUIPMENT}} 报告期累积效率 {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Cumulative Comprehensive Efficiency UNIT": "{{COMBINED_EQUIPMENT}} 报告期累积综合效率 {{UNIT}}",
      "COMBINED_EQUIPMENT Reporting Period Cumulative Comprehensive Efficiency VALUE UNIT": "{{COMBINED_EQUIPMENT}} 报告期累积综合效率 {{VALUE}} {{UNIT}}",
      "COMBINED_EQUIPMENT Base Period Cumulative Comprehensive Efficiency VALUE UNIT": "{{COMBINED_EQUIPMENT}} 基准期累积综合效率 {{VALUE}} {{UNIT}}",
      "Instantaneous Efficiency UNIT": "瞬时效率 {{UNIT}}",
      "EQUIPMENT Instantaneous Efficiency UNIT": "{{EQUIPMENT}} 瞬时效率 {{UNIT}}",
      "COMBINED_EQUIPMENT Instantaneous Comprehensive Efficiency UNIT": "{{COMBINED_EQUIPMENT}} 瞬时综合效率 {{UNIT}}",
      "Reporting Period Cumulative Efficiency VALUE UNIT": "报告期累积效率 {{VALUE}} {{UNIT}}",
      "Base Period Cumulative Efficiency VALUE UNIT": "基准期累积效率 {{VALUE}} {{UNIT}}",
      "Reporting Period CATEGORY Maximum Load UNIT": "报告期 {{CATEGORY}} 最大负荷 {{UNIT}}",
      "Reporting Period CATEGORY Average Load UNIT": "报告期 {{CATEGORY}} 平均负荷 {{UNIT}}",
      "Reporting Period CATEGORY Load Factor": "报告期 {{CATEGORY}} 负荷系数",
      "Reporting Period CATEGORY Average Load VALUE UNIT": "报告期 {{CATEGORY}} 平均负荷 {{VALUE}} {{UNIT}}",
      "Base Period CATEGORY Average Load VALUE UNIT": "基准期 {{CATEGORY}} 平均负荷 {{VALUE}} {{UNIT}}",
      "Reporting Period CATEGORY Maximum Value UNIT": "报告期 {{CATEGORY}} 量最大值 {{UNIT}}",
      "Reporting Period CATEGORY Minimum Value UNIT": "报告期 {{CATEGORY}} 量最小值 {{UNIT}}",
      "Reporting Period CATEGORY Average Value UNIT": "报告期 {{CATEGORY}} 量平均值 {{UNIT}}",
      "Reporting Period Savings CATEGORY (Baseline - Actual) UNIT": "报告期节约 {{CATEGORY}} (基线-实际) {{UNIT}}",
      "Reporting Period Decreased CATEGORY (Baseline - Actual) UNIT": "报告期减少 {{CATEGORY}} (基线-实际) {{UNIT}}",
      "Reporting Period Savings CATEGORY VALUE UNIT": "报告期节约 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Base Period Savings CATEGORY VALUE UNIT": "基准期节约 {{CATEGORY}} {{VALUE}} {{UNIT}}",
      "Trend Values": "趋势值",
      //FDD
      "Fault List": "故障列表",
      "Reporting Period Number of Fault VALUE": "报告期故障数: {{VALUE}}",
      "Number of All Faults": "全部故障数",
      "Number of Space Faults": "空间故障数",
      "Number of Equipment Faults": "设备故障数",
      "Number of Tenant Faults": "租户故障数",
      "Number of Store Faults": "门店故障数",
      "Number of Shopfloor Faults": "车间故障数",
      "Number of Combined Equipment Faults": "组合设备故障数",
      "Reporting Period Lost CATEGORY UNIT": "报告期损耗{{CATEGORY}}量 {{UNIT}}",
      "Reporting Period Lost CATEGORY VALUE UNIT": "报告期损耗{{CATEGORY}}量 {{VALUE}} {{UNIT}}",
      "Upstream Meter": "上游计量表",
      //Data Panels
      "Related Parameters": "相关参数",
      "Detailed Data": "详细数据",
      "Child Spaces Data": "子空间数据",
      "Child Spaces Data of This Month": "本月子空间数据",
      "This Year": "本年",
      "This Month": "本月",
      "This Day": "本日",
      "Total": "总",
      "No data found": "没有数据",
      "Export": "导出",
      //Realtime Chart
      "Realtime Value of Energy Value Point UNIT": "能耗值点实时值 {{UNIT}}",
      "Realtime Value": "实时值",
      //Meter Tracking
      "Meter List": "计量表列表",
      //Profile Dropdown
      "Feedback": "反馈",
      "Account Settings": "账号设置",
      "Logout": "退出",
      //Authentication
      "Log in": "登录",
      "Email address": "电子邮件地址",
      "Password": "密码",
      "Remember me": "记住我",
      "Logged in as ": "已登录 ",
      "Forget Password?": "忘记密码?",
      "Forgot your password?": "忘记你的密码?",
      "Enter your email and we'll send you a reset link.": "输入电子邮件地址，我们会把重置链接发送给您。",
      "Send reset link": "发送重置连接",
      "Thanks for using MyEMS!": "感谢您使用MyEMS!",
      "You are now successfully signed out.": "您已成功退出。",
      "Return to Login": "返回登录",
      "Please check your email!": "请查收您的电子邮件!",
      "An email has been sent to ": "一封电子邮件已经发送至 ",
      "Please click on the included link to reset your password.": "请点击里面的链接重置您的密码。",
      "An email with password reset link is sent to ": "一封包含密码重置链接的电子邮件已经发送至 ",
      "Change Password": "修改密码",
      "Old Password": "原密码",
      "New Password": "新密码",
      "Confirm Password": "重复新密码",
      "Update Password": "更新密码",
      "Password has been changed!": "密码已修改!",
      //notification
      "Notifications": "通知",
      "Mark all as read": "全部设为已读",
      "View all": "查看全部",
      "notification_NEW": "新的",
      "notification_EARLIER": "更早的",
      "Notification List": "通知列表",
      //Monitoring
      "Run Commands": "运行命令",
      "Fault Alarms": "故障报警",
      "Instantaneous Efficiency VALUE UNIT": "瞬时效率 {{VALUE}} {{UNIT}}",
      "Communication Status": "通信状态",
      "Equipment Status": "设备状态",
      "Communication Online": "在线",
      "Communication Offline": "离线",
      "Equipment Running": "运行",
      "Equipment Stopped": "停机",
      "Show Up to": "每页显示数量",
      "All": "全部",
      "FROM - TO of TOTAL Equipments": "当前显示{{FROM}} - {{TO}} 总计{{TOTAL}}台设备",
      //Advanced Reporting & Knowledge Base
      "Created Datetime": "生成时间",
      "File Format": "文件格式",
      "File Size": "文件大小",
      "Uploader": "上传者",
      //Error
      "The page you're looking for is not found.": "您要找的页面不存在。",
      "Make sure the address is correct and that the page hasn't moved. ": "请确认地址正确且页面没有被移动。",
      "If you think this is a mistake,": "如果您认为这是一个错误,",
      "contact us": "联系我们",
      "Take me home": "带我回首页",
      "Whoops, something went wrong!": "哦, 出错了！!",
      "Try refreshing the page, or going back and attempting the action again. ": "请尝试刷新页面, 或回退并再次尝试执行这个操作。 ",
      "If this problem persists,": "如果问题依然存在,",
      //Tenant Bill
      "Lease Contract Number": "租赁合同号码",
      "Download": "下载",
      "Print": "打印",
      "Payment Notice": "付款通知书",
      "Bill To": "致",
      "Bill Number": "账单号码",
      "Bill Date": "账单日期",
      "Payment Due Date": "付款到期日",
      "Amount Payable": "应付款金额",
      "Billing Period Start": "结算期开始日期",
      "Billing Period End": "结算期结束日期",
      "Quantity": "数量",
      "Price": "价格",
      "Amount": "金额",
      "Subtotal": "小计",
      "VAT Output Tax": "增值税销项税金",
      "Total Amount Payable": "应付金额合计",
      "Please make sure to pay on or before the payment due date above":"请确保在上述付款到期日或之前付款",
      "Send money to the following account": "汇款至以下账户",
      "Account Name": "账户名称",
      "Bank Name": "开户银行",
      "Bank Address": "银行地址",
      "RMB Account": "人民币账户",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh_cn",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;