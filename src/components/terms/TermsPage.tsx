import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Terms } from './index';
import { Layout } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> {}

const TermsPage: React.SFC<Props> = (props: Props) => (
  <Layout>
    <Terms />
  </Layout>
);

export default withRouter(TermsPage);
