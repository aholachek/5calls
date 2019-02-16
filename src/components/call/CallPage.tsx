import * as React from 'react';
import { isEqual } from 'lodash';
import { withRouter, RouteComponentProps } from 'react-router';

import { getIssue } from '../shared/utils';
import i18n from '../../services/i18n';
import Call from './Call';
import { Layout } from '../layout';
import { Issue } from '../../common/models';

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

export interface State {
  currentIssue?: Issue;
  currentIssueId: string;
}

class CallPageView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.setStateFromProps(props);
  }

  setStateFromProps(props: Props): State {
    let currentIssue = this.getCurrentIssue(props.remoteState);

    return {
      currentIssue: currentIssue,
      currentIssueId: currentIssue ? currentIssue.id.toString() : ''
    };
  }

  componentDidMount() {
    // the user has clicked on an issue from the sidebar
    if (!this.state.currentIssueId && this.state.currentIssue) {
      selectIssueActionCreator(this.state.currentIssue.id.toString());
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.remoteState.issues) {
      if (!isEqual(this.props, prevProps)) {
        const currentIssue = this.getCurrentIssue(this.props.remoteState);
        this.setState({
          currentIssue: currentIssue,
          currentIssueId: currentIssue ? currentIssue.id.toString() : ''
        });
      }
    }
  }

  getCurrentIssue = (remoteState: RemoteDataState): Issue | undefined => {
    let currentIssue: Issue | undefined = undefined;
    const path = this.props.location.pathname.split('/');
    let issueid = '';
    if (path.length > 2) {
      issueid = path[path.length - 1];
    }
    if (path) {
      if (!this.state || this.state.currentIssueId !== issueid) {
        store.dispatch(selectIssueActionCreator(issueid));
        currentIssue = getIssue(remoteState, issueid);
      }
    } else {
      currentIssue = getIssue(remoteState, this.state.currentIssueId);
    }

    return currentIssue;
  };

  render() {
    if (this.state.currentIssue) {
      return (
        <Layout>
          <Call
            issue={this.state.currentIssue}
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

const CallPageWithRouter = withRouter(CallPageView);

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
