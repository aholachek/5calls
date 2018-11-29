import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Faq } from './index';
import { Layout } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> {}

const FaqPage: React.StatelessComponent<Props> = (props: Props) => (
  <Layout>
    <Faq />
  </Layout>
);

export default withRouter(FaqPage);
