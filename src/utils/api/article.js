// 引入配置好的axios
import service from '../http/request'

export default {
    // 文章
    articleIndex(){
        return service.post(`/article/articleIndex`);
    },

    // 文章详情
    articleDetails(params){
        return service.post(`/article/articleDetails`,{
            params: params
        });
    }
}