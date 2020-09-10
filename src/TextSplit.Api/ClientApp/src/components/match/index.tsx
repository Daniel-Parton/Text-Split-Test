import React, { useState } from 'react';
import { useToasts } from "react-toast-notifications";

import { RouteComponentProps } from 'react-router';
import { CardSimple, ChipList, FormDisplay, Button } from '../shared';
import ToastHelper from '../../helpers/toast-helper';
import Form, { MatchData } from './match-form';
import { ChipProps } from '../shared/chips/chip';

interface MatchPageProps extends RouteComponentProps {
}

interface State {
  data?: MatchData
}
const MatchPage: React.FC<MatchPageProps> = (props) => {

  const toastHelper = new ToastHelper(useToasts());

  const [state, setState] = useState<State>({

  });

  const handleSuccess = (data: MatchData) => {
    toastHelper.success('API Call success');
    setState(ps => ({ ...ps, data: data }));
  }

  const hasMatches = () => state.data?.response.matchCharacterPositions?.length ? true : false;

  return (
    <div className='match-page'>
      <CardSimple container>
        {!state.data && (
          <Form onSuccess={handleSuccess} />
        )}
        {state.data && (
          <React.Fragment>
            <FormDisplay label='Text' text={state.data.request.text} />
            <FormDisplay label='Sub Text' text={state.data.request.subText} />
            {hasMatches() && (
              <React.Fragment>
                <p>Matches:</p>
                <ChipList chips={state.data.response.matchCharacterPositions.map<ChipProps>(v => ({ label: v.toString() }))} />
              </React.Fragment>
            )}
            {!hasMatches() && (
              <p>No matches found</p>
            )}
            <Button className='mt-3 w-100' text='Try Again' onClick={() => setState(ps => ({ ...ps, data: undefined }))} />
          </React.Fragment>
        )}
      </CardSimple>
    </div>
  );
}

export default MatchPage;