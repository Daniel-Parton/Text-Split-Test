import React from 'react';
import { RouteComponentProps } from 'react-router';

interface MatchPageProps extends RouteComponentProps {
}

const MatchPage: React.FC<MatchPageProps> = (props) => {

  return (
    <div>Match</div>
  );
}

export default MatchPage;