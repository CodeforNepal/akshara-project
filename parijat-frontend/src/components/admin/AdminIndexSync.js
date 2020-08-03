import { h, Component } from 'preact';
import { remotePull } from '../../api';
import Button from '../button';
import Loading from '../loading';
import style from './style';

export default class AdminIndexSync extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  remotePull = async () => {
    this.setState({ loading: true });
    const res = await remotePull();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : null }
        <h4>Pull Down Remote Repository</h4>
        <p>
           This action pulls down remote git repository that contains crowd
           contributed content, and then indexes the changes to the search index.
        </p>
        <div>
          <Button disabled={loading} onClick={this.remotePull}>Remote Pull</Button>
        </div>
      </div>
    )
  }
}
