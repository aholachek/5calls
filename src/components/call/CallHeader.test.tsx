import * as React from 'react';
import { shallow } from 'enzyme';
import { CallHeader } from './index';
import { Issue } from '../../common/model';

test('Call header component should be rendered if passed a valid object', () => {
  const issue: Issue = Object.assign({}, new Issue(), {
    id: '1',
    name: 'testName'
  });
  const component = shallow(
    <CallHeader invalidAddress={false} currentIssue={issue} />
  );
  const node = component.find('h1.call__title');
  expect(node.text()).toBe('testName');
});
