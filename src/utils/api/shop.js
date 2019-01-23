// 引入配置好的axios
import service from '../http/request'

export default {
    // 店铺列表
    shopList(){
        return service.post(`/tableData`);
    },

    // 店铺详情
    shopDetails(params){
        return service.post(`/shop/shopDetails`,params);
    }
}