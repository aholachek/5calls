import * as React from 'react';
import { Helmet } from 'react-helmet';

import * as Constants from '../../common/constants';
import { Issue } from '../../common/models';

interface Props {
  issue?: Issue;
}

class HeadMeta extends React.Component<Props> {
  public render() {
    const pageTitle = this.props.issue
      ? this.props.issue.name + ': 5 Calls'
      : '5 Calls: Make Your Voice Heard';
    const pageDescription =
      'Spend 5 minutes. Make 5 calls. Make your voice heard.';

    let canonicalURL: string | undefined = undefined;
    let shareImageURL = 'https://5calls.org/img/5calls-twitter.png';
    if (this.props.issue) {
      let slug = this.props.issue.slugOrID();

      canonicalURL = Constants.APP_URL + '/issue/' + slug;
      shareImageURL = `${Constants.SHARE_BUCKET_URL}${this.props.issue.id}.png`;
    }

    return (
      <Helmet>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />

        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={pageDescription} />
        <meta itemProp="image" content={shareImageURL} />

        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@make5calls" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image:src" content={shareImageURL} />

        {/* <!-- Open Graph data --> */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={Constants.APP_URL} />
        <meta property="og:image" content={shareImageURL} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:site_name" content="5 Calls" />
        <meta property="fb:app_id" content="1201592636562906" />

        <link rel="canonical" href={canonicalURL} />
      </Helmet>
    );
  }
}

export default HeadMeta;
