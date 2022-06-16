// ** React Imports
import React, { CSSProperties, forwardRef, ReactNode } from 'react';

import classnames from 'classnames';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';

export type AvatarSize = 'sm' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';
export type AvatarBadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'dark' | 'light-primary' | 'light-secondary' | 'light-success' | 'light-danger' | 'light-info' | 'light-warning' | 'light-dark';
export type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'dark' | 'light-primary' | 'light-secondary' | 'light-success' | 'light-danger' | 'light-info' | 'light-warning' | 'light-dark';

interface AvatarProps {
  img?: string,
  icon?: ReactNode,
  src?: string,
  badgeUp?: boolean,
  content?: string,
  badgeText?: string,
  className?: string,
  imgClassName?: string,
  contentStyles?: CSSProperties,
  size?: AvatarSize,
  status?: AvatarStatus,
  imgHeight?: string | number,
  imgWidth?: string | number,
  badgeColor?: AvatarBadgeColor,
  color?: AvatarColor,
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str: string | undefined) => {
    if (!str) {
      return '';
    }
    const results : Array<string> = [];
    const wordArray = str.split(' ');
    wordArray.forEach((e) => {
      results.push(e[0]);
    });
    return results.join('');
  };

  return (
    <div
      className={classnames('avatar', {
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      }, className && { [className]: className })}
      ref={ref}
      {...rest}
    >
      {!img ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {getInitials(content)}

          {icon || null}
          {badgeUp ? (
            <Badge color={badgeColor || 'primary'} className="badge-sm badge-up" pill>
              {badgeText || '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames(imgClassName && {
            [imgClassName]: imgClassName,
          })}
          src={img}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        />
      ) : null}
    </div>
  );
});

Avatar.defaultProps = {
  img: undefined,
  badgeColor: undefined,
  badgeText: undefined,
  badgeUp: undefined,
  className: undefined,
  imgClassName: undefined,
  content: undefined,
  size: 'sm',
  status: undefined,
  contentStyles: {},
  imgHeight: 10,
  imgWidth: 10,
  color: 'primary',
  icon: undefined,
  src: undefined,
};

export default Avatar;
