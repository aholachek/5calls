import * as React from 'react';
import { shallow } from 'enzyme';
import i18n from '../../services/i18n';
import { ContactOffices } from './index';
import { mockContact } from '../../common/models/contact';
import { mockIssue } from '../../common/models/issue';

// these were just to match the snapshots previously, which is shit for testing these things
test('Contact offices should display if available', () => {
  const component = shallow(
    <ContactOffices currentIssue={mockIssue} currentContact={mockContact} />
  );
  expect(component).toMatchSnapshot();
});

test('Contact offices should not display if unavailable', () => {
  const component = shallow(
    <ContactOffices currentIssue={mockIssue} currentContact={mockContact} />
  );
  expect(component).toMatchSnapshot();
});
