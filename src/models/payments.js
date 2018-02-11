import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'payments',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllPaymentsSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },


    getAllPaymentsFailed(state,{message}){
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



  },
  effects: {


    getAllPayments:[function *({id},{call,put}){
      try{


        let payments = null;
        yield get(`/api/payments/account/${id}`).then(response => {

           payments = response.data


         })

          yield put({
            type:"getAllPaymentsSuccess",
            payload:payments
          });


      }
      catch (error){
        console.log(error,'error');
        yield put({ type: 'getAllPaymentsFailed'});

      }
   },{type: 'takeLatest'}],

    upsertPayments:[function *({payload,callback = null},{call,put}){
      try{
        yield post('/api/payments',payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}],
    *updateFormInput({payload},{call,put}){
      yield put({ type: 'updateFormInputSuccess', payload});
    },
  },
  subscriptions: {},
};
