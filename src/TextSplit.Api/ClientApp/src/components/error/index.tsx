import React from 'react';
import { History } from "history";
import { RouteComponentProps } from 'react-router';

import { StandardPage, Button } from '../shared';

interface RouteState {
  title?: string
  description?: string
}

export const goToErrorPage = (history: History, title: string, description: string) => {
  history.push('/error', { title: title, description: description });
}

interface ErrorPageProps extends RouteComponentProps<any, any, RouteState> {
}

const ErrorPage: React.FC<ErrorPageProps> = ({ location, history }) => {

  let title = 'Error';
  let description = 'An Unknown error has occured.';
  const routeState = location.state;
  if (routeState && routeState.title) title = routeState.title;
  if (routeState && routeState.description) description = routeState.description;

  const handleBackToApp = () => history.push('/');

  return (
    <StandardPage
      image='Oops'
      title={title}
      description={description}
    >
      <Button bsVariant='secondary' onClick={handleBackToApp}>Back to App</Button>
    </StandardPage>
  );
}

export default ErrorPage;