import React, { useContext } from 'react';
import { ToastProvider } from 'react-toast-notifications'
import { Route, RouteComponentProps } from 'react-router';
import { Switch } from 'react-router-dom';

import Layout from './layout';
import ErrorPage from './error';
import MatchPage from './match';

interface AppContextGetterProps {
  loadingMessage?: string
}

export interface AppContextProps extends AppContextGetterProps {
}

const AppContext = React.createContext<AppContextProps>({
  loadingMessage: undefined
});

export const useAppContext = () => useContext(AppContext);

const App: React.FC<RouteComponentProps> = () => {

  return (
    <ToastProvider autoDismissTimeout={3000} placement='bottom-right'>
      <div id='app'>
        <div className='page'>
          <Switch>
            <Route path='/error' component={ErrorPage} />
            <Layout>
              <Route path='/' component={MatchPage} exact />
            </Layout>
          </Switch>
        </div>
      </div>
    </ToastProvider >
  );
}

export default App;
