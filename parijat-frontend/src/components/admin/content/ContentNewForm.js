import { h } from 'preact';
import { Field, reduxForm } from 'redux-form'
import Button from '../../button';
import style from './style';

export const FORM_NAME = 'formContentNew';

const validate = values => {
  const errors = {}
  if (!values.author) {
    errors.author = 'Required'
  }
  if (!values.lang) {
    errors.lang = 'Required'
  }
  if (!values.genre) {
    errors.genre = 'Required'
  }
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.text) {
    errors.text = 'Required'
  }
  return errors
}

function FormField({ htmlFor, name, children }) {
  return (
    <div className={style.ContentNewForm__Field}>
      <label className={style.ContentNewForm__Field__label} htmlFor={htmlFor}>{ name }</label>
      { children }
    </div>
  );
}

function ContentNew() {
  return (
    <form onSubmit={this.props.submitForm} className={style.ContentNewForm}>
      <FormField htmlFor="title" name="Title">
        <Field name="title" component="input" />
      </FormField>
      <FormField htmlFor="author" name="Author">
        <Field name="author" component="input" type="text" />
      </FormField>
      <FormField htmlFor="lang" name="Language">
        <Field name="lang" component="input" type="text" />
      </FormField>
      <FormField htmlFor="genre" name="Genre">
        <Field name="genre" component="input" />
      </FormField>
      <FormField htmlFor="text" name="Text">
        <Field name="text" component="textarea" />
      </FormField>
      <FormField htmlFor="source" name="Source">
        <Field name="source" component="input" />
      </FormField>
      <FormField htmlFor="source_link" name="Source Link">
        <Field name="source_link" component="input" />
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  );
}

const ContentNewForm = reduxForm({
  form: FORM_NAME,
  validate,
})(ContentNew)

export default ContentNewForm;
