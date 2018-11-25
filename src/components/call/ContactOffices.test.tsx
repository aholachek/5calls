import * as React from 'react';
import { shallow } from 'enzyme';
import i18n from '../../services/i18n';
import { ContactOffices } from './index';
import {
  Issue,
  Contact,
  DefaultContact,
  FieldOffice
} from '../../common/model';

test('Contact offices should display if available', () => {
  const fieldOffice: FieldOffice = {
    city: 'San Francisco',
    phone: '5555551212'
  };
  const contact: Contact = Object.assign({}, DefaultContact, {
    id: '101',
    name: 'dude',
    phone: '5555551212',
    party: '',
    state: 'CA',
    reason: 'this is your dude',
    fieldOffices: [fieldOffice],
    outcomeModels: [{ label: 'vm', status: 'vm' }]
  });
  const issue: Issue = Object.assign({}, new Issue(), {
    id: '1',
    name: 'testName',
    contacts: [contact]
  });

  const component = shallow(
    <ContactOffices currentIssue={issue} contactIndex={0} t={i18n.t} />
  );
  expect(component).toMatchSnapshot();
});

test('Contact offices should not display if unavailable', () => {
  const contact: Contact = Object.assign({}, DefaultContact, {
    id: '101',
    name: 'dude',
    phone: '5555551212',
    party: '',
    state: 'CA',
    reason: 'this is your dude'
  });
  const issue: Issue = Object.assign({}, new Issue(), {
    id: '1',
    name: 'testName',
    contacts: [contact],
    outcomeModels: [
      { label: 'unavailable', status: 'unavailable' },
      { label: 'contact', status: 'contact' }
    ]
  });

  const component = shallow(
    <ContactOffices currentIssue={issue} contactIndex={0} t={i18n.t} />
  );
  expect(component).toMatchSnapshot();
});
