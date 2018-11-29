import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Privacy } from './index';
import { Layout } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> {}

const PrivacyPage: React.StatelessComponent<Props> = (props: Props) => (
  <Layout>
    <Privacy />
  </Layout>
);

export default withRouter(PrivacyPage);
