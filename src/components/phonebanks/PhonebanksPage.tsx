import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
// import i18n from '../../services/i18n';
import { Phonebanks } from './index';
import { Layout } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> {}

const PhonebanksPage: React.StatelessComponent<Props> = (props: Props) => (
  <Layout>
    <Phonebanks />
  </Layout>
);

export default withRouter(PhonebanksPage);
