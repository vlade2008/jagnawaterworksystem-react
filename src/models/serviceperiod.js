import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'service_period',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllServicePeriodFailed(state,{message}){
      return {
        ...state
      }
    },

    getAllServicePeriodSuccess(state,{payload}){
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


    getAllServicePeriod:[function *({},{call,put}){
      try{


        let settings = null;
        yield get('/api/settings').then(response => {

           settings = response.data


         })

         let data = [];

         data.push(settings)

         yield put({
           type:"getAllServicePeriodSuccess",
           payload:data
         });


      }
      catch (error){

        yield put({ type: 'getAllServicePeriodFailed'});

      }
   },{type: 'takeLatest'}],




    upsertServicePeriod:[function *({payload,callback = null},{call,put}){
      try{
        yield post('/api/settings',payload).then(response => {

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
