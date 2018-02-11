import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'consumers',
  state: {
    records:[],
    activeRecord:{},
    monthlyRecord:[],
    activeRecordMonthly:{}
  },
  reducers: {


    getAllConsumersSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },




    getAllConsumersFailed(state,{message}){
      return {
        ...state
      }
    },

    updateFormInputSuccess(state,{payload}){
      if(payload == 'clear'){
        return update(state,{
            activeRecord:{
                $set:{}
            }
        });
      }else{
        return update(state,{
            activeRecord:{
                $merge:payload
            }
        });
      }
    },



    getAllConsumersMonthlySuccess(state,{payload}){
      return update(state,{
          monthlyRecord: {
            $set: payload
          }
      });
    },

    getAllConsumersMonthlyFailed(state,{message}){
      return {
        ...state
      }
    },




  },
  effects: {

    deleteConsumers:[function *({id, callback=null},{call,put}){
      console.log(id);
      try{
        yield destroy(`/api/consumers/${id}`).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        if(callback) callback(false,error);
      }

     },{type: 'takeLatest'}],


    getAllConsumers:[function *({},{call,put}){
      try{


        let consumers = null;
        yield get('/api/consumers').then(response => {

           consumers = response.data


         })

          yield put({
            type:"getAllConsumersSuccess",
            payload:consumers
          });


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
        yield post(`/api/consumers/${payload.account_no}`,payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        console.log(error,'mao ne siya');
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}],

    *updateFormInput({payload},{call,put}){
      yield put({ type: 'updateFormInputSuccess', payload});
    },


    // monthly record consumers

    getAllConsumersMonthly:[function *({id},{call,put}){
      try{


        let consumers = null;
        yield get(`/api/monthly-bills/account/${id}`).then(response => {

           consumers = response.data

         })

          yield put({
            type:"getAllConsumersMonthlySuccess",
            payload:consumers
          });


      }
      catch (error){

        yield put({ type: 'getAllConsumersMonthlyFailed'});

      }
   },{type: 'takeLatest'}],





  },
  subscriptions: {},
};
