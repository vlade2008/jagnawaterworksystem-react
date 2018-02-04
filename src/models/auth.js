import {withRouter,routerRedux} from 'dva/router'

import {get,post} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'auth',
  state: {
    api_key:''
  },
  reducers: {

    loginSuccess(state,{account,api_key,isLogin}){
      return {
        ...state,
        account:account,
        api_key:api_key,
        isLogin:isLogin
      }
    },

    loginFailed(state,{message}){
      return {
        ...state
      }
    },

    logoutSuccess(state,{message}){
      return {
        ...state
      }
    },

  },
  effects: {


    *logout(payload,{call,put}){
         yield put({
          type:'logoutSuccess'
        })
        yield put(routerRedux.push("/login"));

    },
    login:[function *({payload},{call,put}){
      try{
        let account = null;
        yield get('/api/login',{
          params:{
            username:payload.username,
            password:payload.password,
          }
        }).then(response => {

           account = response.data


         })
        if(!account.error){
          yield put({
            type:"loginSuccess",
            account:account.user,
            api_key:account.api_key,
            isLogin:account.error
        });
        localStorage.setItem('api_key',account.api_key)
        localStorage.setItem('userlevel',account.user.userlevel)
         yield put(routerRedux.push("/dashboard"));
        }
      }
      catch (error){

        yield put({ type: 'loginFailed'});

      }

    },{type: 'takeLatest'}]
  },
  subscriptions: {},
};
