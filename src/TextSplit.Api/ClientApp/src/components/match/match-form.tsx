import React from 'react';
import { AutoForm } from '../shared';
import { MatchResponse, MatchRequest } from '../../api/match/api-models';
import { required, maxCharLength } from '../shared/form/validators';
import * as MatchApi from '../../api/match';

export interface MatchData {
  request: MatchRequest
  response: MatchResponse
}

interface MatchFormProps {
  onSuccess: (data: MatchData) => void
}

const MatchForm: React.FC<MatchFormProps> = ({ onSuccess }) => {

  return (
    <AutoForm<MatchRequest, MatchData>
      rows={[
        { columns: [{ field: { name: 'text', type: 'TextInput', display: 'Text', options: { validators: [required(), maxCharLength(100)] } } }] },
        { columns: [{ field: { name: 'subText', type: 'TextInput', display: 'Sub Text', options: { validators: [required(), maxCharLength(100)] } } }] },
      ]}
      onSubmitPromise={(request) => {
        return MatchApi.getMatch(request).then(response => {
          const data: MatchData = { request: request, response: response.data }
          return data;
        });
      }}
      onSubmitSuccess={r => onSuccess(r)}
      hideBack
      submitButtonText='Check for matches'
      toastOnError
    />
  );
}

export default MatchForm;