// 这里是所有api接口的统一出口
// 文章模块接口
// 无用的模块可以不用导出
import article from './article';
import shop from './shop';

// 导出接口
export default {
    article,
    shop,
}