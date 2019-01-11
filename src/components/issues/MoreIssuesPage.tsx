import * as React from 'react';

import { Layout } from '../layout';
import { MoreIssues } from './index';
import { remoteStateContext } from '../../contexts/RemoteStateContext';
import { callStateContext } from '../../contexts';

interface Props {}

class MoreIssuesPage extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <main role="main" id="content" className="layout__main">
          <callStateContext.Consumer>
            {callState => (
              <remoteStateContext.Consumer>
                {state => (
                  <MoreIssues
                    remoteState={state}
                    completedIssueIds={callState.completedIssueIds}
                  />
                )}
              </remoteStateContext.Consumer>
            )}
          </callStateContext.Consumer>
        </main>
      </Layout>
    );
  }
}

export default MoreIssuesPage;
