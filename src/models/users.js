// import {withRouter,routerRedux} from 'dva/router'
//
// import {get,getLogin,post} from '../rest/rest'
//
//
// import update from 'react-addons-update';
//
// export default {
//   namespace: 'users',
//   state: {
//     api_key:''
//   },
//   reducers: {
//
//
//
//   },
//   effects: {
//
//
//
//     login:[function *({payload},{call,put}){
//       try{
//         let account = null;
//         yield getLogin('/api/login',{
//           params:{
//             username:payload.username,
//             password:payload.password,
//           }
//         }).then(response => {
//
//            account = response.data
//
//
//          })
//         if(!account.error){
//           yield put({
//             type:"loginSuccess",
//             account:account.user,
//             api_key:account.api_key,
//             isLogin:account.error
//         });
//         localStorage.setItem('api_key',account.api_key)
//         localStorage.setItem('userlevel',account.user.userlevel)
//          yield put(routerRedux.push("/dashboard"));
//         }
//       }
//       catch (error){
//
//         yield put({ type: 'loginFailed'});
//
//       }
//
//     },{type: 'takeLatest'}]
//   },
//   subscriptions: {},
// };
