import React from 'react';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  altText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({
  className,
  onClick,
  altText,
  children,
  ...otherProps
}: React.PropsWithChildren<IconButtonProps>) {
  return (
    <button className={className} onClick={onClick} {...otherProps}>
      {children}
      <span className="sr-only">{altText}</span>
    </button>
  );
}
