import React from 'react';
import { X } from 'react-feather';
import Avatar from '../Avatar/Avatar';
import '../../assets/scss/react/libs/toastify/toastify.scss';

interface ErrorToastProps {
  title?: string,
  textMuted?: string,
  text?: string,
}

function ErrorToast(props: ErrorToastProps) {
  const { title, text, textMuted } = props;
  return (
    <>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="danger" icon={<X size={12} />} />
          <h6 className="toast-title">{title}</h6>
        </div>
        <small className="text-muted">{textMuted}</small>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {text}
        </span>
      </div>
    </>
  );
}

ErrorToast.defaultProps = {
  title: 'Error!',
  text: '',
  textMuted: '',
};

export default ErrorToast;
