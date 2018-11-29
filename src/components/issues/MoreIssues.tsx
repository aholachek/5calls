import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import { Issue, CategoryMap, Category } from '../../common/model';
import { IssuesListItem } from './index';
import { getIssuesIfNeeded } from '../../redux/remoteData';
import { store } from '../../redux/store';
import { selectIssueActionCreator } from '../../redux/callState';

interface Props {
  readonly activeIssues: Issue[];
  readonly inactiveIssues: Issue[];
  readonly completedIssueIds: string[];
  readonly t: TranslationFunction;
  readonly currentIssue: Issue;
}

interface State {
  currentIssue: Issue;
  issueCategoryMap: CategoryMap[];
  totalCount: number;
}

export class MoreIssues extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.setStateFromProps(props);
  }

  setStateFromProps(props: Props): State {
    const totalCount =
      (props.inactiveIssues ? props.inactiveIssues.length : 0) +
      (props.activeIssues ? props.activeIssues.length : 0);
    let categoryMap: CategoryMap[] = [];

    // this makes more sense as an actual Map<string, Issues[]> but I couldn't get it
    // to render in the view no matter what I tried, so it's this /shrug
    if (this.props.inactiveIssues) {
      this.props.inactiveIssues.forEach(issue => {
        let category: string = 'uncategorized';

        if (issue.categories[0]) {
          category = issue.categories[0].name;

          let availableMap;
          categoryMap.forEach(map => {
            if (map.category.name === category) {
              availableMap = map;
            }
          });

          if (availableMap) {
            availableMap.issues.push(issue);
          } else {
            let newCategory: Category = { name: category };
            let newCategoryMap: CategoryMap = {
              category: newCategory,
              issues: [issue]
            };
            categoryMap.push(newCategoryMap);
          }
        }
      });
    }

    categoryMap.sort((a, b) => {
      let nameA = a.category.name.toLowerCase();
      let nameB = b.category.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return {
      currentIssue: this.props.currentIssue,
      issueCategoryMap: categoryMap,
      totalCount: totalCount
    };
  }

  componentDidMount() {
    getIssuesIfNeeded();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.activeIssues && !prevProps.activeIssues) {
      let newState = this.setStateFromProps(this.props);
      this.setState(newState);
    }
  }

  render() {
    if (!this.state.currentIssue && this.props.currentIssue) {
      store.dispatch(selectIssueActionCreator(this.props.currentIssue.id));
    }

    return (
      <section className="call">
        <div className="call_complete">
          <h1 className="call__title">
            {this.props.t('issues.activeIssuesWithCount', {
              count: this.state.totalCount
            })}
          </h1>
          {this.state.issueCategoryMap ? (
            this.state.issueCategoryMap.map((cat, key) => (
              <div key={key}>
                <h2>{cat.category.name}</h2>
                <ul className="issues-list" role="navigation">
                  {cat.issues.map(issue => (
                    <IssuesListItem
                      key={issue.id}
                      issue={issue}
                      isIssueComplete={
                        this.props.completedIssueIds &&
                        find(
                          this.props.completedIssueIds,
                          (issueId: string) => issue.id === issueId
                        ) !== undefined
                      }
                      isIssueActive={false}
                    />
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <span />
          )}
        </div>
      </section>
    );
  }
}

export const MoreIssuesTranslatable = translate()(MoreIssues);
