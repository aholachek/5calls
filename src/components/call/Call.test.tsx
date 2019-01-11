import * as React from 'react';
import { shallow } from 'enzyme';

import { Call } from './index';
import { Issue, ContactList } from '../../common/models';
import { CallState } from '../../redux/callState';
import { mockContact } from '../../common/models/contact';
import { mockIssue } from '../../common/models/issue';

test('Call component should be rendered if passed a valid object', () => {
  let callState: CallState = {
    currentIssueId: 'test1',
    contactIndexes: { test1: 2, test2: 1 },
    completedIssueIds: ['test1', 'test2']
  };
  let contactList = new ContactList();
  contactList.house = [mockContact];
  const component = shallow(
    <Call
      issue={mockIssue}
      contacts={contactList}
      callState={callState}
      getContactsIfNeeded={jest.fn()}
    />
  );
  expect(component).toMatchSnapshot();
});
