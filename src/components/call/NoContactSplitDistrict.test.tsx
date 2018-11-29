import * as React from 'react';
import i18n from '../../services/i18n';
import { shallow } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import { NoContactSplitDistrict } from './';

test('NoContactSplitDistrict component snapshot renders correctly when splitDistrict=true', () => {
  const component = shallow(
    <I18nextProvider i18n={i18n}>
      <NoContactSplitDistrict splitDistrict={false} />
    </I18nextProvider>
  );
  expect(component).toMatchSnapshot();
});
