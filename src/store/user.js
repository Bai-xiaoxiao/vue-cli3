// 该模块用于储存用户状态  是否登录，或者token之类的东西
const user = {
    state: {

    },
    mutations: {

    },
    actions: {
        GetToken() {
            return true;
        },
        GetUserInfo(context, payload) {
            return new Promise((res, rej) => {
                if(true) {
                    res();
                }else{
                    rej('没有登录');
                }
            })
        },
        FedLogOut(){
            return new Promise((res, rej) => {
                if(true) {
                    res();
                }else{
                    rej();
                }
            })
        }
    }
}

export default user