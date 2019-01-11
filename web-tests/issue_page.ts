import { ClientFunction, t, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';

const getWindowLocation = ClientFunction(() => window.location.href);

fixture`IssuePage`.page`http://localhost:3000?setLocation=94114`.beforeEach(
  async () => {
    await waitForReact(15000);
  }
);

const skipOnCi = process.env.CI ? test.skip : test;

// tslint:disable-next-line:no-shadowed-variable
skipOnCi('Link on sidebar navigates to issue page', async t => {
  // const Sidebar = await ReactSelector('Sidebar');
  // const IssueItems = await Sidebar.findReact('li');
  // // FIXME: make this `nth()` choice stable. The data in these tests comes
  // // from a live API and is therefore not predictable. Different data can lead
  // // to different renderings, some of will cause this test to fail.
  // const firstIssue = IssueItems.nth(2);
  // const linkComponent = await firstIssue.findReact('a');
  // const link = await linkComponent.getAttribute('href');

  // FIXME: the above code using React-based selectors has been commented out
  // because it doesn't seem to be very reliable in practice (it often hangs
  // waiting for components to show up even when they are verifiably there).
  // This standard HTML-element based selector code appears to be reliable, but
  // getting the React stuff above to work would be nice.

  // FIXME: make this nth-child choice stable. The data in these tests comes
  // from a live API and is therefore not predictable. Different data can lead
  // to different renderings, some of will cause this test to fail.
  const firstIssue = Selector('.layout__side .issues-list > li:nth-child(5) a');
  const link = await firstIssue.getAttribute('href');

  await t.click(firstIssue).navigateTo(link);

  await t.expect(getWindowLocation()).eql('http://localhost:3000' + link);

  // ensure selectors are no longer on the page
  const extras = await Selector('.extras');
  await t
    .expect(extras.exists)
    .notOk('Extras div appears on page when it should not');

  // ensure the header and title exists
  const header = await Selector('.call__header');
  await t.expect(header.exists).ok('The call header is missing from the page');

  const headerText = await header.find('.call__title');
  await t
    .expect(headerText.exists)
    .ok('The call header text is missing from the page');

  // ensure the call body exists and is below the header
  const callBody = await headerText.nextSibling('.call__reason');
  await t
    .expect(callBody.exists)
    .ok('The call body text is missing from the page');

  // ensure the contact element exists
  const contact = await Selector('.call__contact');
  await t.expect(contact.exists).ok('The ContactDetails element is missing');

  const image = await contact.child('.call__contact__image');
  await t.expect(image.exists).ok('The contact image element is missing');
  const contactName = await contact.child('.call__contact__name');
  await t.expect(contactName.exists).ok('The call contact name is missing');
  const contactPhone = await contact.child('.call__contact__phone');
  await t
    .expect(contactPhone.exists)
    .ok('The call contact phone element is missing');

  // check for the call script
  const script = await Selector('.call__script');
  await t.expect(script.exists).ok('The call script is missing from the page');

  const scriptBody = script.child('.call__script__body');
  await t.expect(scriptBody.exists).ok('The call script body is missing');

  // check for call outcomes
  const buttonLabels = [
    'UNAVAILABLE',
    'LEFT VOICEMAIL',
    'MADE CONTACT',
    'SKIP'
  ];

  const callOutcomes = await Selector('.call__outcomes');
  await t.expect(callOutcomes.exists).ok('Call outcomes is missing');

  const callButtons = await callOutcomes.child('.call__outcomes__items');
  const buttons = await callOutcomes.find('button');
  const count = await buttons.count;
  await t.expect(count).eql(4);
});
