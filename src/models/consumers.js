import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'consumers',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {


    getAllConsumersFailed(state,{message}){
      return {
        ...state
      }
    },

  },
  effects: {

    getAllConsumers:[function *({},{call,put}){
      try{


        let consumers = null;
        yield get('/api/consumers').then(response => {

           consumers = response.data

           console.log(consumers,'all consumers');

         })
        // if(!account.error){
        //   yield put({
        //     type:"loginSuccess",
        //     account:account.user,
        //     api_key:account.api_key,
        //     isLogin:account.error
        //   });
        // }


      }
      catch (error){

        yield put({ type: 'getAllConsumersFailed'});

      }
   },{type: 'takeLatest'}],



    upsertConsumers:[function *({payload,callback = null},{call,put}){
      try{
        yield post('/api/consumers',payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}],


    updateConsumers:[function *({payload,callback = null},{call,put}){
      try{
        yield post(`/api/consumers/${payload.id}`,payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        console.log(error,'mao ne siya');
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}],


  },
  subscriptions: {},
};
