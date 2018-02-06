import dva from 'dva';
import './layout/global-styles';

import browserHistory from 'history/createBrowserHistory'
import 'antd/dist/antd.less'
import {createLogger} from 'redux-logger';


// 1. Initialize
let  app = null;
if (process.env.NODE_ENV !== 'production') {
  app = dva({
    history:browserHistory(),
    onAction: createLogger({
      level: 'info',
      collapsed: true,
    })
  });
}
else {
 app = dva({
    history:browserHistory()
  });
}


// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/auth'));
app.model(require('./models/users'));
app.model(require('./models/consumers'));
app.model(require('./models/consumertypes'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
