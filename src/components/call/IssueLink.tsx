import * as React from 'react';
import { Issue } from '../../common/model';

interface Props {
  readonly issue?: Issue;
}

const IssueLink: React.StatelessComponent<Props> = ({ issue }: Props) => {
  if (issue && issue.link) {
    let linkTitle = issue.link;
    if (issue.linkTitle) {
      linkTitle = issue.linkTitle;
    }

    return (
      <h4 className="call__script__link">
        <a target="link" href={issue.link}>
          {linkTitle}
        </a>
      </h4>
    );
  } else {
    return <span />;
  }
};

export default IssueLink;
