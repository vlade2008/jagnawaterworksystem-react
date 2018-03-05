export const adminOnly = (Component)=>{
    class AuthComponent extends React.Component{

        render(){

            let content=null;
            let userlevel = localStorage.getItem('userlevel')
            if( userlevel === 'admin' )
                content = <Component {...this.props}/>;

            return content
        }
    }



    return  AuthComponent
};
