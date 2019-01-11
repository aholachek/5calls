import * as React from 'react';
import { shallow } from 'enzyme';

import { IssuesList } from './index';
import { Issue } from '../../common/models';

test('should show IssuesListItem elements', () => {
  const issues = [
    Object.assign({}, new Issue(), { id: '1' }),
    Object.assign({}, new Issue(), { id: '2' })
  ];
  const component = shallow(
    <IssuesList
      issues={issues}
      completedIssueIds={[]}
      getIssuesIfNeeded={jest.fn()}
    />
  );
  const items = component.find('IssuesListItem');
  expect(items.length).toBe(issues.length);
});

test('should show no IssueListItem elements if there are no issues to show', () => {
  const issues = [];
  const component = shallow(
    <IssuesList
      issues={issues}
      completedIssueIds={[]}
      getIssuesIfNeeded={jest.fn()}
    />
  );
  const node = component.find('ul').find('IssuesListItem');
  // console.log('node: \n', node);
  expect(node.length).toBe(0);
});
