import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,destroy} from '../rest/rest'


import update from 'react-addons-update';

export default {
  namespace: 'inquiry',
  state: {
    records:[],
    activeRecord:{}
  },
  reducers: {

    getAllInquirySuccess(state,{payload}){
      return update(state,{
          records: {
            $set: payload
          }
      });
    },


    getAllInquiryFailed(state,{message}){
      return {
        activeRecord: {
          $set: {}
        }
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


    getAllInquiry:[function *({payload},{call,put}){
      try{


        let inquiry = null;
        yield get('/userApi/inquiry/monthly-bills/unpaid/account',{
          params:{
            lname:payload.lname,
            mname:payload.mname,
            fname:payload.fname,
            account_no:payload.account_no
          }
        }).then(response => {

           inquiry = response.data


         })

          yield put({
            type:"updateFormInputSuccess",
            payload:inquiry
          });


      }
      catch (error){
        console.log(error,'error');
        yield put({ type: 'updateFormInputSuccess',payload:'clear'});

      }
   },{type: 'takeLatest'}],
    *updateFormInput({payload},{call,put}){
      yield put({ type: 'updateFormInputSuccess', payload});
    },
  },
  subscriptions: {},
};
