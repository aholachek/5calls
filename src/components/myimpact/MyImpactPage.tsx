import * as React from 'react';
import { MyImpactTranslatable } from './index';
import { Layout } from '../layout';
import { userStateContext, userStatsContext } from '../../contexts';

interface Props {}

const MyImpactPage: React.StatelessComponent<Props> = (props: Props) => (
  <Layout>
    <userStateContext.Consumer>
      {user => (
        <userStatsContext.Consumer>
          {stats => (
            <MyImpactTranslatable currentUser={user} userStats={stats} />
          )}
        </userStatsContext.Consumer>
      )}
    </userStateContext.Consumer>
  </Layout>
);

export default MyImpactPage;
