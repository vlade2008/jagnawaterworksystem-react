import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'consumertypes',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllConsumerTypesFailed(state,{message}){
      return {
        ...state
      }
    },

    getAllConsumerTypesSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
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



  },
  effects: {


    getAllConsumertypes:[function *({},{call,put}){
      try{


        let consumertypes = null;
        yield get('/api/consumerTypes').then(response => {

           consumertypes = response.data


         })
        if(!_.isEmpty(consumertypes)){
          yield put({
            type:"getAllConsumerTypesSuccess",
            payload:consumertypes
          });
        }


      }
      catch (error){

        yield put({ type: 'getAllConsumerTypesFailed'});

      }
   },{type: 'takeLatest'}],


   deleteConsumerTypes:[function *({id, callback=null},{call,put}){
     try{
       yield destroy(`/api/consumerTypes/${id}`).then(response => {

          if(callback) callback(true);

        })
     }
     catch (error){
       if(callback) callback(false,error);
     }

    },{type: 'takeLatest'}],

    upsertConsumerTypes:[function *({payload,callback = null},{call,put}){
      try{
        yield post('/api/consumerTypes',payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}],

    updateConsumerTypes:[function *({payload,callback = null},{call,put}){
      try{
        yield post(`/api/consumerTypes/${payload.id}`,payload).then(response => {

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
  },
  subscriptions: {},
};
