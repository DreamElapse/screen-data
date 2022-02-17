//const VERSION = process.env.VUE_APP_VERSION
export default {
  //api地址
  qrcodeInfo: code => `lost_found/app/api/chip_baggage/qrcode/info/${code}`, //退出接口
  productCateSaleData: (start, end) =>
    `https://erp-api.yishizongheng.com/datacenter/product_sale/productCateSaleData?start_date=${start}&end_date=${end}`,
  getVtNumList:'https://erp-api.yishizongheng.com/datacenter/common/vTnumList',
  getNumCompareList:(cnum)=>`https://erp-api.yishizongheng.com/datacenter/data_view/todayWeekOrderNumCompare?v_tnum=${cnum}`,
  getVtnum10:'https://erp-api.yishizongheng.com/datacenter/data_view/todayVtnumAsc10',
  getWeekSalesAmount:'https://erp-api.yishizongheng.com/datacenter/data_view/weekSalesAmount',
  getTodayBaseSalesRate:'https://erp-api.yishizongheng.com/datacenter/data_view/todayBaseSalesRate',
  getTrainBestCrew:'https://erp-api.yishizongheng.com/datacenter/data_view/trainAndBestCrew',
  getMonitorData:'https://erp-api.yishizongheng.com/datacenter/data_view/orderMonitor',
  getTodayYesterDayData:'https://erp-api.yishizongheng.com/datacenter/data_view/todayYesterdaySalesCompare',
  login:'/screen/v1/login',
  historyData:(type)=>`/screen/v1/base_data/historyData/${type}`,//历史总数据
  todayTop10:(type,status)=>`/screen/v1/base_data/topTen/${type}/${status}`,//今日top10
  todayData:(type,status)=>`/screen/v1/base_data/mealData/${type}/${status}`,//今日数据
  currentOrder:(type,time)=>`/screen/v1/base_data/currentOrder/${type}/${time}`,//实时订单
  trainNum:(type)=>`/screen/v1/base_data/trainNum/${type}`,//出乘车次数量
  userSource:(type)=>`/screen/v1/base_data/sourceOfUser/${type}`,//用户来源
  currentAmount:(type,status)=>`/screen/v1/base_data/currentAmount1/${type}/${status}`,
  currentAmount2:(type,status)=>`/screen/v1/base_data/currentAmount2/${type}/${status}`,//实时销售订单
  orderAnalyse:(type,status)=>`/screen/v1/base_data/orderAnalyse/${type}/${status}`,
  recentSales:(type)=>`/screen/v1/base_data/recentSales/${type}`,
  recentOrders:(type)=>`/screen/v1/base_data/recentOrders/${type}`,
  recentUsers:(type)=>`/screen/v1/base_data/recentUsers/${type}`

};
