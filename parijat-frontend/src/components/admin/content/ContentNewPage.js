import { Component, h } from 'preact';
import Loading from '../../loading';
import ContentForm, { FORM_NAME } from './ContentForm';
import { createContent } from '../../../api';
import style from './style.css';

class ContentNewPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  submitForm = async (newContent) => {
    this.setState({ loading: true });
    try {
      const res = await createContent(newContent);
      this.setState({ loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div className={style.ContentNewPage}>
        { loading ? <Loading /> : null }
        <h3>Add New Content</h3>
        <ContentForm submitForm={this.submitForm} />
      </div>
    );
  }
}

export default ContentNewPage;
