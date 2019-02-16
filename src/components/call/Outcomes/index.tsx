import { connect } from 'react-redux';
import Outcomes from './Outcomes';
import { ApplicationState } from '../../../redux/root';

const mapStateToProps = (state: ApplicationState) => ({
  userState: state.userState,
  eventEmitter: state.eventEmitter
});

export default connect(mapStateToProps)(Outcomes);
