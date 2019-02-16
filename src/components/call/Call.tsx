import * as React from 'react';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { Issue, Contact, ContactList } from '../../common/models';
import CallHeader from './CallHeader';
import ContactDetails from './ContactDetails';
import Outcomes from './Outcomes';
import Script from './Script';
import ContactProgress from './ContactProgress';
import { eventContext } from '../../contexts/EventContext';
import { Mixpanel } from '../../services/mixpanel';
import { ApplicationState } from '../../redux/root';

// This defines the props that we must pass into this component.
export interface Props {
  issue: Issue;
  contacts: ContactList;
  contactIndexes: [];
  getContactsIfNeeded: (force: boolean) => void;
}

export interface State {
  currentContact: Contact | undefined;
  currentContactIndex: number;
  numberContactsLeft: number;
}

export class Call extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = this.setStateFromProps(props);
  }

  componentDidMount() {
    this.props.getContactsIfNeeded(false);
    Mixpanel.track('Topic', { IssueID: this.props.issue.id });
  }

  setStateFromProps(props: Props): State {
    let currentContactIndex = 0;
    if (
      props.issue &&
      props.contactIndexes &&
      props.contactIndexes[props.issue.slug]
    ) {
      currentContactIndex = props.contactIndexes[props.issue.slug];
    }

    // after this contact, the number of contacts that are left to connect with
    const numberContactsLeft =
      props.issue &&
      props.issue.numberOfContacts(this.props.contacts) -
        (currentContactIndex + 1);
    const currentContact = props.issue.currentContact(
      this.props.contacts,
      currentContactIndex
    );

    return {
      currentContact: currentContact,
      currentContactIndex: currentContactIndex,
      numberContactsLeft: numberContactsLeft
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps, this.props)) {
      this.setState(this.setStateFromProps(this.props));
    }
  }

  selectContact(index: number) {
    const currentContact = this.props.issue.currentContact(
      this.props.contacts,
      index
    );
    this.setState({
      currentContactIndex: index,
      currentContact: currentContact
    });
  }

  render() {
    return (
      <section className="call">
        <CallHeader currentIssue={this.props.issue} />
        <ContactProgress
          currentIssue={this.props.issue}
          contactList={this.props.contacts}
          currentContact={this.state.currentContact}
          selectContact={this.selectContact}
        />
        {this.state.currentContact && (
          <>
            <ContactDetails
              currentIssue={this.props.issue}
              currentContact={this.state.currentContact}
            />
            <Script
              issue={this.props.issue}
              currentContact={this.state.currentContact}
            />
            <eventContext.Consumer>
              {eventManager => (
                <Outcomes
                  currentIssue={this.props.issue}
                  eventEmitter={eventManager.ee}
                  numberContactsLeft={this.state.numberContactsLeft}
                  currentContactId={
                    this.state.currentContact
                      ? this.state.currentContact.id
                      : ''
                  }
                />
              )}
            </eventContext.Consumer>
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  contactIndexes: state.callState.contactIndexes
});

export default connect(mapStateToProps)(Call);
