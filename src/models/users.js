import {withRouter,routerRedux} from 'dva/router'

import {get,getLogin,post,put,destroy} from '../rest/rest'


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


   deleteUser:[function *({id, callback=null},{call,put}){
     try{
       yield destroy('/userApi/users',id).then(response => {

          if(callback) callback(true);

        })
     }
     catch (error){
       if(callback) callback(false,error);
     }

    },{type: 'takeLatest'}],

    upsertUser:[function *({payload,callback = null},{call,put}){
      try{
        yield post('/userApi/users',payload).then(response => {

           if(callback) callback(true);

         })
      }
      catch (error){
        if(callback) callback(false,error);
      }

    },{type: 'takeLatest'}],

    updateUser:[function *({payload,callback = null},{call,put}){
      try{
        yield post(`/userApi/users/${payload.id}`,payload).then(response => {

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
