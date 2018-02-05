import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'users',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllUsersFailed(state,{message}){
      return {
        ...state
      }
    },

    getAllUsersSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },

  },
  effects: {


    getAllUsers:[function *({},{call,put}){
      try{


        let users = null;
        yield get('/userApi/users').then(response => {

           users = response.data


         })
        if(!_.isEmpty(users)){
          yield put({
            type:"getAllUsersSuccess",
            payload:users
          });
        }


      }
      catch (error){

        yield put({ type: 'getAllUsersFailed'});

      }
   },{type: 'takeLatest'}],


    upsertUser:[function *({payload,callback = null},{call,put}){
      delete payload.confirm;
      delete payload.userlevel;
      try{
        yield post('/userApi/users',payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}]
  },
  subscriptions: {},
};
