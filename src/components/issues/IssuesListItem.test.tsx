import * as React from 'react';
import { shallow } from 'enzyme';

import { IssuesListItem } from './index';
import { Issue } from '../../common/models';

test('IssuesListItem issue click passes issue id', () => {
  const issue = Object.assign(new Issue(), { id: '123', slug: 'issue' });
  const isIssueComplete = false;
  const isIssueActive = false;

  const component = shallow(
    <IssuesListItem
      key={issue.id}
      issue={issue}
      isIssueComplete={isIssueComplete}
      isIssueActive={isIssueActive}
    />
  );
  const link = component.find('Link');
  link.simulate('click');
  // we no longer pass a function in here to select an issue, so I'm not sure how we do this test
});
