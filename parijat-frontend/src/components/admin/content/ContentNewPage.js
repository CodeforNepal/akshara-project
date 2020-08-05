import { Component, h } from 'preact';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Loading from '../../loading';
import ContentNewForm, { FORM_NAME } from './ContentNewForm';
import { createContent } from '../../../api';
import style from './style.css';

class ContentNewPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  submitForm = async (evnt) => {
    evnt.preventDefault();
    this.setState({ loading: true });
    const { author, lang, genre, title, text, source, source_link } = this.props;
    try {
      const res = await createContent({ author, lang, genre, title, text, source, source_link });
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
        <ContentNewForm submitForm={this.submitForm} />
      </div>
    );
  }
}

export default connect(state => {
  return state.formReducer.formContentNew != null ? state.formReducer.formContentNew.values : {};
})(ContentNewPage);
