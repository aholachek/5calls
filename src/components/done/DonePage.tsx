import * as React from 'react';
import * as isEqual from 'lodash.isequal';

import { withRouter, RouteComponentProps } from 'react-router';
import { getIssuesIfNeeded, RemoteDataState } from '../../redux/remoteData';
import { selectIssueActionCreator } from '../../redux/callState';
import { store } from '../../redux/store';
import { getIssue } from '../shared/utils';
import { remoteStateContext } from '../../contexts';

import { DoneTranslatable } from './index';
import { Layout } from '../layout';
import { Issue } from '../../common/models';

interface Props extends RouteComponentProps<{}> {
  remoteState: RemoteDataState;
}

export interface State {
  currentIssue?: Issue;
  totalCount: number;
}

class DonePageView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = this.setStateFromProps(props);
    this.getView = this.getView.bind(this);
  }

  setStateFromProps(props: Props): State {
    let currentIssue = this.getCurrentIssue(props.remoteState);
    return {
      currentIssue: currentIssue,
      totalCount: props.remoteState.callTotal
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.remoteState.issues && !isEqual(this.props, prevProps)) {
      const curIssue = this.getCurrentIssue(this.props.remoteState);
      this.setState({
        currentIssue: curIssue,
        totalCount: this.props.remoteState.callTotal
      });
    }
  }

  componentDidMount() {
    getIssuesIfNeeded();
  }

  getCurrentIssue = (remoteState: RemoteDataState): Issue | undefined => {
    let currIssue: Issue | undefined;

    const path = this.props.location.pathname.split('/');
    let issueid = '';
    if (path.length > 2) {
      issueid = path[path.length - 1];
      store.dispatch(selectIssueActionCreator(issueid));
      currIssue = getIssue(remoteState, issueid);
    }

    return currIssue;
  };

  getView() {
    if (this.state.currentIssue) {
      return (
        <Layout>
          {this.state.currentIssue && (
            <DoneTranslatable
              currentIssue={this.state.currentIssue}
              totalCount={this.state.totalCount}
            />
          )}
        </Layout>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return <div>{this.getView()}</div>;
  }
}

export const DonePageWithRouter = withRouter(DonePageView);

export default class DonePage extends React.Component {
  render() {
    return (
      <remoteStateContext.Consumer>
        {remoteState => <DonePageWithRouter remoteState={remoteState} />}
      </remoteStateContext.Consumer>
    );
  }
}
