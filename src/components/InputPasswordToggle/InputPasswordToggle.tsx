import React, { useState, forwardRef } from 'react';
import {
  InputGroup, Input, InputGroupText, Label, InputProps,
} from 'reactstrap';
import { Eye, EyeOff } from 'react-feather';
import classnames from 'classnames';

interface InputPasswordToggleProps extends InputProps {
  invalid: boolean,
  visible: boolean,
  className: string,
  placeholder: string,
  iconSize: number,
  inputClassName: string,
  label: string,
  htmlFor: string,
}

const InputPasswordToggle = forwardRef<Input, InputPasswordToggleProps>((props, ref) => {
  const {
    label,
    visible,
    className,
    htmlFor,
    placeholder,
    iconSize,
    inputClassName,
    invalid,
    ...rest
  } = props;
  const [inputVisibility, setInputVisibility] = useState(visible);
  return (
    <>
      {
        label && (
          <Label className="form-label" for={htmlFor}>
            {label}
          </Label>
        )
      }
      <InputGroup
        className={classnames({
          [className]: className,
          'is-invalid': invalid,
        })}
      >
        <Input
          ref={ref}
          invalid={invalid}
          type={!inputVisibility ? 'password' : 'text'}
          placeholder={placeholder || '············'}
          className={classnames({
            [inputClassName]: inputClassName,
          })}
          {...(label && htmlFor
            ? {
              id: htmlFor,
            }
            : {})}
          {...rest}
        />
        <InputGroupText className="cursor-pointer" onClick={() => setInputVisibility(!inputVisibility)}>
          {
            inputVisibility ? (
              <EyeOff size={14} />
            ) : (
              <Eye size={14} />
            )
          }
        </InputGroupText>
      </InputGroup>
    </>
  );
});

export default InputPasswordToggle;
