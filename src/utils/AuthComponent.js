export const adminOnly = (Component)=>{
    class AuthComponent extends React.Component{

        render(){

            let content=null;
            let userlevel = localStorage.getItem('userlevel')
            if( userlevel === 'admin' )
                content = <Component {...this.props}/>;


            setTimeout(()=>{
                this.authenticate();
            },200);


            return content
        }
    }



    return  AuthComponent
};
