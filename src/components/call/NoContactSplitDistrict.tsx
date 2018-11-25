import * as React from 'react';
import { Link } from 'react-router-dom';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import { clearAddress } from '../../redux/location';
import { store } from '../../redux/store';

interface Props {
  readonly splitDistrict: boolean;
  readonly t: TranslationFunction;
}

class NoContactSplitDistrict extends React.PureComponent<Props> {
  focusTextInput = e => {
    store.dispatch(clearAddress());
    window.scroll(1, 1);
  };

  render() {
    return (
      // tslint:disable-next-line:jsx-wrap-multiline
      <div className="call__nocontact">
        <h2>You're missing some of the contacts for this issue.</h2>

        <p>
          We can't accurately find your location.{' '}
          <strong>
            <a className="location-link" onClick={this.focusTextInput}>
              Enter your street address
            </a>
          </strong>{' '}
          by clicking <strong>"Change Location"</strong> on the left sidebar to
          get your correct Representatives.
        </p>

        <p>
          Want to know more about why you need a more accurate location? Check
          out our <Link to="/faq">frequently asked questions page</Link>.
        </p>
      </div>
    );
  }
}

export default translate()(NoContactSplitDistrict);
