import { h, Component } from 'preact';
import { DownloadCloud, UploadCloud } from 'preact-feather';
import { remotePull, remotePush } from '../../api';
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

  remotePush = async () => {
    this.setState({ loading: true });
    const res = await remotePush();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : null }
        <div>
          <h4>Pull Down Remote Repository</h4>
          <p>
             This action pulls down remote git repository that contains crowd
             contributed content, and then indexes the changes to the search index.
          </p>
          <div>
            <Button disabled={loading} onClick={this.remotePull}><DownloadCloud /> Remote Pull</Button>
          </div>
        </div>
        <div>
          <h4>Push Repository to Remote</h4>
          <p>
             This action pushes the local git repository to remote repo.
             This task runs automatically every 60 minutes.
          </p>
          <div>
            <Button disabled={loading} onClick={this.remotePush}><UploadCloud /> Remote Push</Button>
          </div>
        </div>
      </div>
    )
  }
}
