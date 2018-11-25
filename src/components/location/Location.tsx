import * as React from 'react';
import { isEqual } from 'lodash';
import { LocationState } from '../../redux/location/reducer';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import { LocationUiState } from '../../common/model';
import { newLocationLookup, clearAddress } from '../../redux/location';
import { store } from '../../redux/store';

interface Props {
  t: TranslationFunction;
  locationState: LocationState;
}

// this will be needed
interface State {
  location: string;
  uiState: LocationUiState;
}

export class Location extends React.Component<Props, State> {
  private addressInput: HTMLInputElement | null;

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = this.setStateFromProps(props);
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps, this.props)) {
      this.setState(this.setStateFromProps(this.props));
    }
  }

  componentDidMount() {
    if (this.addressInput) {
      this.addressInput.focus();
    }
  }

  /**
   * Set state from props when props
   * are initialized or refreshed
   *
   * @param {Props} props
   * @returns {State}
   */
  setStateFromProps(props: Props): State {
    let location =
      props.locationState.cachedCity || props.locationState.address;
    let uiState = props.locationState.uiState;
    if (!location && uiState !== LocationUiState.ENTERING_LOCATION) {
      uiState = LocationUiState.LOCATION_ERROR;
    }

    return {
      location,
      uiState
    };
  }

  getWidgetTitle() {
    let title = <span />;
    switch (this.state.uiState) {
      case LocationUiState.LOCATION_FOUND:
        title = (
          <p id="locationMessage">
            {this.props.t('location.yourLocation')}:{' '}
            <span>{this.state.location}</span>
          </p>
        );
        break;
      case LocationUiState.FETCHING_LOCATION:
        title = (
          <p id="locationMessage" className="loadingAnimation">
            {this.props.t('location.gettingYourLocation')}
          </p>
        );
        break;
      case LocationUiState.LOCATION_ERROR:
        title = (
          <p id="locationMessage" role="alert">
            {this.props.t('location.invalidAddress')}
          </p>
        );
        break;
      case LocationUiState.ENTERING_LOCATION:
        title = (
          <p id="locationMessage">{this.props.t('location.chooseALocation')}</p>
        );
        break;
      default:
        break;
    }
    return title;
  }

  getWidget() {
    let widget = <span />;
    switch (this.state.uiState) {
      case LocationUiState.FETCHING_LOCATION:
        // No widget in this case
        break;
      case LocationUiState.LOCATION_FOUND:
        const enterLocation = e => {
          e.preventDefault();
          store.dispatch(clearAddress());
        };
        widget = (
          <div>
            <button onClick={enterLocation}>
              {this.props.t('location.changeLocation')}
            </button>
          </div>
        );
        break;
      case LocationUiState.LOCATION_ERROR:
      // FIXME: clear address text box
      // console.log('Clear address text box')
      // console.log('Remove break statement')
      // break;
      case LocationUiState.ENTERING_LOCATION:
        const submitAddress = e => {
          e.preventDefault();
          const newLocation = e.target.elements.address.value;

          if (newLocation === '') {
            // if the user hits "Go" with no location, clear what they had and refresh to try the default again
            store.dispatch(clearAddress());
            window.location.reload();
          } else {
            // tslint:disable-next-line:no-any
            store.dispatch<any>(newLocationLookup(newLocation));
          }
        };
        const clearTextBox = e => {
          e.target.value = '';
        };
        widget = (
          <div>
            <form onSubmit={submitAddress}>
              <input
                type="text"
                ref={input => {
                  this.addressInput = input;
                }}
                autoFocus={true}
                id="address"
                name="address"
                aria-labelledby="locationMessage"
                aria-invalid={
                  this.state.uiState === LocationUiState.LOCATION_ERROR
                }
                onFocus={clearTextBox}
                placeholder="Enter an address or zip code"
              />
              <button>{this.props.t('common.go')}</button>
            </form>
          </div>
        );
        break;
      default:
        break;
    }
    return widget;
  }

  render() {
    return (
      <div>
        {this.getWidgetTitle()}
        {this.getWidget()}
      </div>
    );
  }
}

export const LocationTranslatable = translate()(Location);
