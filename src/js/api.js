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
  recentUsers:(type)=>`/screen/v1/base_data/recentUsers/${type}`,

  // 2022-02-20 首页接口
  LOGIN: `/api/v1/user/login`, // 登录
  getSevenData: (trainNo) => `/screen/sevenDays/${trainNo}`, // get 近7日数据统计(销售额，订单量，用户量)
  goodsSalesRate: `/screen/category/sale`, // get 商品品类销售额占比
  getGoodsSalesRank: `/screen/product/sale/rank`, // get 商品销售TOP10
  trainOrderRank: `/screen/today/train/order/rank`, // get 今日车底下单TOP10
  getBaseData: (userId) => `/api/v1/screen/websocket/${userId}`, // websocket get 基础数据
  trainWork: `/api/v1/railway/screen/ride/statistical`, // get 出乘统计
  disinfect: `/api/v1/railway/screen/disinfect/statistics`, // get 消毒统计
  getTrainList: `/api/v1/railway/base_railway/query/menu`, // get 车底列表
  getCateList: `/api/v1/provider/product/category/menu`, // get 商品品类列表

};
