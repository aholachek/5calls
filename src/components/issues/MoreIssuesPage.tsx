import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../layout';
import { Issue } from '../../common/model';
import { MoreIssuesTranslatable } from './index';
import { remoteStateContext } from '../../contexts/RemoteStateContext';

interface RouteProps extends RouteComponentProps<{ id: string }> {}

interface Props extends RouteProps {
  readonly currentIssue: Issue;
  readonly completedIssueIds: string[];
}

class MoreIssuesPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <remoteStateContext.Consumer>
        {state => (
          <Layout>
            <main role="main" id="content" className="layout__main">
              <MoreIssuesTranslatable
                activeIssues={state.issues}
                inactiveIssues={state.inactiveIssues}
                completedIssueIds={this.props.completedIssueIds}
                currentIssue={this.props.currentIssue}
              />
            </main>
          </Layout>
        )}
      </remoteStateContext.Consumer>
    );
  }
}

export default MoreIssuesPage;
