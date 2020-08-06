import { Component, h } from 'preact';
import { withRouter } from 'react-router';
import Loading from '../../loading';
import ContentForm, { FORM_NAME } from './ContentForm';
import { createContent, getContent } from '../../../api';
import style from './style.css';

class ContentEditPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      initialValues: {},
    };
  }

  async componentDidMount() {
		const { id } = this.props.match.params;
		const result = await getContent(id);
		this.setState({ initialValues: result._source, loading: false });
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
    const { loading, initialValues } = this.state;
    return (
      <div className={style.ContentNewPage}>
        { loading ? <Loading /> : null }
        <h3>Edit Content</h3>
        <ContentForm
          initialValues={initialValues}
          submitForm={this.submitForm}
        />
      </div>
    );
  }
}

export default withRouter(ContentEditPage);
