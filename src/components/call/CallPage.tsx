import * as React from 'react';
import { isEqual } from 'lodash';
import { withRouter, RouteComponentProps } from 'react-router';

import { getIssue } from '../shared/utils';
import i18n from '../../services/i18n';
import { Call } from './index';
import { Layout } from '../layout';

import { CallState, selectIssueActionCreator } from '../../redux/callState';
import { RemoteDataState } from '../../redux/remoteData';
import { store } from '../../redux/store';

import { remoteStateContext, callStateContext } from '../../contexts';
import { getContactsIfNeeded } from '../../redux/remoteData/asyncActionCreator';

interface RouteProps {
  readonly groupid: string;
  readonly issueid: string;
}

interface Props extends RouteComponentProps<RouteProps> {
  remoteState: RemoteDataState;
  callState: CallState;
}

class CallPageView extends React.Component<Props> {
  componentDidMount() {
    const currentIssueId = this.getIssueIdFromLocation(this.props);
    if (currentIssueId) {
      store.dispatch(selectIssueActionCreator(currentIssueId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.remoteState.issues) {
      const currentIssueId = this.getIssueIdFromLocation(this.props);
      const previousIssueId = this.getIssueIdFromLocation(prevProps);
      if (currentIssueId && !isEqual(currentIssueId, previousIssueId)) {
        store.dispatch(selectIssueActionCreator(currentIssueId));
      }
    }
  }

  getIssueIdFromLocation = (props = this.props) => {
    const pathnameMatch = props.location.pathname.match(/issue\/([^/]+)/);
    const issueid = pathnameMatch && pathnameMatch[1];
    return issueid;
  };

  render() {
    const issueid = this.getIssueIdFromLocation();
    if (!issueid) {
      return null;
    }
    const currentIssue = getIssue(this.props.remoteState, issueid);
    if (currentIssue) {
      return (
        <Layout>
          <Call
            issue={currentIssue}
            contacts={this.props.remoteState.contacts}
            callState={this.props.callState}
            getContactsIfNeeded={getContactsIfNeeded}
          />
        </Layout>
      );
    } else {
      return (
        <Layout>
          <h1 className="call__title">{i18n.t('noCalls.title')}</h1>
          <p>{i18n.t('noCalls.reason')}</p>
          <p>{i18n.t('noCalls.nextStep')}</p>
        </Layout>
      );
    }
  }
}

export const CallPageWithRouter = withRouter(CallPageView);

export default class CallPage extends React.Component {
  render() {
    return (
      <remoteStateContext.Consumer>
        {remoteState => (
          <callStateContext.Consumer>
            {callState => (
              <CallPageWithRouter
                remoteState={remoteState}
                callState={callState}
              />
            )}
          </callStateContext.Consumer>
        )}
      </remoteStateContext.Consumer>
    );
  }
}
