import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

import { Issue } from '../../common/models';
import { linkRefRenderer } from '../shared/markdown-utils';

interface Props {
  currentIssue: Issue;
}

export const CallHeader: React.StatelessComponent<Props> = ({
  currentIssue
}: Props) => {
  return (
    <header className="call__header">
      <h1 className="call__title">{currentIssue.name}</h1>
      <div className="call__reason">
        <ReactMarkdown
          source={currentIssue.reason}
          linkTarget="_blank"
          renderers={{ linkReference: linkRefRenderer }}
        />
      </div>
    </header>
  );
};
