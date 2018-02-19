import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'unpaid',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllUnpaidSuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },


    getAllUnpaidFailed(state,{message}){
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


    getAllUnpaid:[function *({id},{call,put}){
      try{


        let unpaid = null;
        yield get(`/api/monthly-bills/unpaid/account/${id}`).then(response => {

           unpaid = response.data


         })

          yield put({
            type:"getAllUnpaidSuccess",
            payload:unpaid
          });


      }
      catch (error){
        console.log(error,'error');
        yield put({ type: 'getAllUnpaidFailed'});

      }
   },{type: 'takeLatest'}],
    *updateFormInput({payload},{call,put}){
      yield put({ type: 'updateFormInputSuccess', payload});
    },
  },
  subscriptions: {},
};
