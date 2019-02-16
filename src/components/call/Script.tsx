import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { linkRefRenderer } from '../shared/markdown-utils';
import { Contact } from '../../common/models/contact';
import { Issue } from '../../common/models/issue';
import { ApplicationState } from '../../redux/root';

interface Props {
  readonly issue: Issue;
  readonly currentContact: Contact;
  readonly cachedCity: String;
}

// Replacement regexes, ideally standardize copy to avoid complex regexs
const titleReg = /\[REP\/SEN NAME\]|\[SENATOR\/REP NAME\]/gi;
const locationReg = /\[CITY,\s?ZIP\]|\[CITY,\s?STATE\]/gi;

export function getContactNameWithTitle(contact: Contact) {
  let title = '';
  switch (contact.area) {
    case 'House':
      title = 'Rep. ';
      break;
    case 'Senate':
      title = 'Senator ';
      break;
    case 'StateLower':
    case 'StateUpper':
      title = 'Legislator ';
      break;
    case 'Governor':
      title = 'Governor ';
      break;
    case 'AttorneyGeneral':
      title = 'Attorney General ';
      break;
    case 'SecretaryOfState':
      title = 'Secretary of State ';
      break;
    default:
      title = '';
  }
  return title + contact.name;
}

function scriptFormat(issue: Issue, cachedCity: String, contact: Contact) {
  let script = issue.script;
  if (cachedCity) {
    script = script.replace(locationReg, cachedCity);
  }

  const title = getContactNameWithTitle(contact);
  script = script.replace(titleReg, title);

  return script;
}

export const Script: React.StatelessComponent<Props> = ({
  issue,
  currentContact,
  cachedCity
}: Props) => {
  let formattedScript = scriptFormat(issue, cachedCity, currentContact);

  return (
    <div className="call__script">
      <div className="call__script__body">
        <ReactMarkdown
          source={formattedScript}
          linkTarget="_blank"
          renderers={{ linkReference: linkRefRenderer }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  cachedCity: state.locationState.cachedCity
});

export default connect(mapStateToProps)(Script);
