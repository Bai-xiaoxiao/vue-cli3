// 这里可以管理域名配置
// 我这里只有单域名，就直接在@/utils/http/request.js配置了
// 多域名的话可以在单个模块引入这里的base
//service.post(`${base.域名1}/shop/shopDetails`,{
//     params: params
// });
export default {
    '域名1': 'baidu.com',
    '域名2': 'jd.com'
}