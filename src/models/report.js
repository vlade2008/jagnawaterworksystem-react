import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'report',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllReportSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },


    getAllReportFailed(state,{message}){
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


    getAllReport:[function *({id},{call,put}){
      try{


        let report = null;
        yield get(`/api/monthly-bills-report`).then(response => {

           report = response.data


         })

          yield put({
            type:"getAllReportSuccess",
            payload:report
          });


      }
      catch (error){
        console.log(error,'error');
        yield put({ type: 'getAllReportFailed'});

      }
   },{type: 'takeLatest'}],
    *updateFormInput({payload},{call,put}){
      yield put({ type: 'updateFormInputSuccess', payload});
    },
  },
  subscriptions: {},
};
