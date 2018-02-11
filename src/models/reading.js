import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'reading',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllReadingSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },


    getAllReadingFailed(state,{message}){
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


    getAllReading:[function *({id},{call,put}){
      try{


        let reading = null;
        yield get(`/api/readings/account/${id}`).then(response => {

           reading = response.data


         })

          yield put({
            type:"getAllReadingSuccess",
            payload:reading
          });


      }
      catch (error){
        console.log(error,'error');
        yield put({ type: 'getAllReadingFailed'});

      }
   },{type: 'takeLatest'}],

    upsertReading:[function *({payload,callback = null},{call,put}){
      try{
        yield post('/api/readings',payload).then(response => {

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
