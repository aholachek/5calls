import * as React from 'react';

import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import * as Constants from '../../common/constants';

interface Props {
  totalCount: number;
  t: TranslationFunction;
}

export const Why5calls: React.StatelessComponent<Props> = (props: Props) => (
  <div className="hypothesis">
    <header className="hypothesis__header">
      <h1 className="hypothesis__title">{props.t('hypothesis.title')}</h1>
      <h2 className="hypothesis__subtitle">
        <strong>5 Calls</strong> is the easiest and most effective way for
        citizens to make an impact in national and local politics
      </h2>
    </header>
    <div className="hypothesis__text">
      <a href={Constants.contact.apps}>
        <img src="/img/5calls-apps.png" className="hypothesis__text__mobile" />
      </a>
      <p dangerouslySetInnerHTML={{ __html: props.t('hypothesis.p3') }} />
      <div className="subscribe">
        <form
          action="//5calls.us16.list-manage.com/subscribe/post?u=82a164d5fe7f51f4a4efb1f83&amp;id=624ef52208"
          method="post"
          target="popupwindow"
        >
          <label htmlFor="email">
            <strong>{props.t('footer.emailLabel')}</strong>
          </label>
          <span className="emailform">
            <input
              type="text"
              placeholder="youremail@example.com"
              name="email"
              id="email"
            />
            <input type="submit" value={props.t('footer.subscribe')} />
          </span>
        </form>
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  </div>
);

export const Why5callsTranslatable = translate()(Why5calls);
