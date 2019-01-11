import * as React from 'react';
import { Issue } from '../../common/models';
import { IssuesList } from '../issues';
import { getIssuesIfNeeded } from '../../redux/remoteData';

interface Props {
  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly completedIssueIds: string[];
}

const Sidebar: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <IssuesList
      issues={props.issues}
      currentIssue={props.currentIssue}
      completedIssueIds={props.completedIssueIds}
      getIssuesIfNeeded={getIssuesIfNeeded}
    />
  );
};

export default Sidebar;
