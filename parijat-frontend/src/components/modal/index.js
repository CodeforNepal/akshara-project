import { h } from 'preact';
import ReactModal from 'react-modal';
import style from './style.css';

ReactModal.setAppElement('#app');

export const Modal = (props) => {
  return <ReactModal className={style.Modal} {...props} />;
}

export const Header = ({ children }) => {
  return <div className={style.Header}>{ children }</div>;
}

export const Content = ({ children }) => {
  return <div className={style.Content}>{ children }</div>;
}

export const Footer = ({ children }) => {
  return <div className={style.Footer}>{ children }</div>;
}
