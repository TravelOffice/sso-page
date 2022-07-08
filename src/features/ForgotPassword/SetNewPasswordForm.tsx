import React, { useCallback } from 'react';
import { Info } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button, CardText, CardTitle, Form, FormFeedback, Input, Label, UncontrolledTooltip,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import InputPasswordToggle from '@components/InputPasswordToggle/InputPasswordToggle';
import authProvider from '@providers/AuthProvider';
import toasty from '@components/Toasty/Toasty';

interface NewPasswordFormData {
  verificationCode: string,
  newPassword: string,
  confirmPassword: string,
}

interface UsernameProps {
  username: string
}

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .min(6, 'Verification code must be exactly 6 numbers')
    .max(6, 'Verification code must be exactly 6 numbers')
    .required('Please enter verification code')
    .matches(/^[0-9]+$/, 'Must be only digits'),
  newPassword: yup
    .string()
    .required('Please enter new password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{8,99}$/,
      'Password is invalid',
    ),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('newPassword'), null], 'Confirm password must match new password'),
});

export default function NewPasswordForm(props: UsernameProps) {
  const { username } = props;
  const navigate = useNavigate();
  const setNewPasswordCallback = useCallback((formData: NewPasswordFormData) => {
    if (username) {
      authProvider.setNewPassword(
        username,
        formData.verificationCode,
        formData.newPassword,
      ).then(() => {
        toasty.show({ title: 'Success!', type: 'success', message: 'Set new password successfully.' });
        navigate('/sign-in');
      }).catch((error: Error) => {
        toasty.show({ title: 'Error!', type: 'error', message: error.message });
      });
    }
  }, [username]);

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<NewPasswordFormData>({ resolver: yupResolver(schema) });
  return (
    <Form className="auth-reset-password-form mt-2" onSubmit={handleSubmit(setNewPasswordCallback)}>
      <CardTitle tag="h2" className="fw-bold mb-1">
        Set New Password
      </CardTitle>
      <CardText className="mb-2">
        Please enter verification code and set new password
      </CardText>
      <div className="mb-1">
        <Label className="form-label-font-size" for="verificationCode">
          Verification code
        </Label>
        <Controller
          name="verificationCode"
          control={control}
          render={({ field }) => (
            <Input
              className="input-group-merge"
              invalid={!!errors.verificationCode}
              {...field}
            />
          )}
        />
        {errors.verificationCode
                && <FormFeedback>{errors.verificationCode.message}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label-font-size" for="new-password">
          <span className="align-middle">New password</span>
          {' '}
          <Info id="new-password" size={14} />
          <UncontrolledTooltip
            placement="bottom"
            target="new-password"
          >
            <span>
              Password must include at least 8 characters, 1 uppercase, 1 lowercase,
              1 number and 1 special case character
            </span>
          </UncontrolledTooltip>
        </Label>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle className="input-group-merge" invalid={errors.newPassword} {...field} />
          )}
        />
        {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label-font-size" for="confirm-password">
          <span className="align-middle">Confirm password</span>
          {' '}
          <Info id="confirm-password" size={14} />
          <UncontrolledTooltip
            placement="bottom"
            target="confirm-password"
          >
            <span>
              Confirm password must match new password
            </span>
          </UncontrolledTooltip>
        </Label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle className="input-group-merge" invalid={errors.confirmPassword} {...field} />
          )}
        />
        {errors.confirmPassword
          && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
      </div>
      <Button color="primary" block>
        Submit
      </Button>
    </Form>
  );
}
