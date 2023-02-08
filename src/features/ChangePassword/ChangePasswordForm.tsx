import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  CardText,
  CardTitle,
  Form,
  FormFeedback,
  Label,
} from 'reactstrap';
import authProvider from '@providers/AuthProvider';
import toasty from '@components/Toasty/Toasty';
import InputPasswordToggle from '@components/InputPasswordToggle/InputPasswordToggle';

export interface ChangePasswordFormProps {
}

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  oldPassword: yup.string().required('Password is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .notOneOf(
      [yup.ref('oldPassword'), null],
      'Passwords must not match old password',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export default function ChangePasswordForm() {
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUri: string | null = searchParams.get('redirect_uri');
  const forgotPasswordCallback = useCallback(
    (params: ChangePasswordFormData) => {
      const { oldPassword, newPassword } = params;
      authProvider
        .changePassword(oldPassword, newPassword)
        .then(() => {
          toasty.show({
            title: 'Success!',
            type: 'success',
            message: 'Your password has been changed successfully',
          });
          window.location.replace(`${redirectUri}?event=change-password-success`);
          authProvider.signOut();
        })
        .catch((error: Error) => {
          toasty.show({
            title: 'Error!',
            type: 'error',
            message: error.message,
          });
        });
    },
    [],
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({ resolver: yupResolver(schema) });

  return (
    <Form
      className="auth-forgot-password-form mt-2"
      onSubmit={handleSubmit(forgotPasswordCallback)}
    >
      <CardTitle tag="h2" className="fw-bold mb-1">
        Change Password
      </CardTitle>
      <CardText className="mb-2">
        Enter your old password and new password
      </CardText>
      <div className="mb-1">
        <Label className="form-label-font-size" for="oldPassword">
          Old Password
        </Label>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle
              autoFocus
              className="input-group-merge"
              invalid={!!errors.oldPassword}
              {...field}
            />
          )}
        />
        {errors.oldPassword && (
          <FormFeedback>{errors.oldPassword.message}</FormFeedback>
        )}
      </div>
      <div className="mb-1">
        <Label className="form-label-font-size" for="oldPassword">
          New Password
        </Label>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle
              className="input-group-merge"
              invalid={!!errors.newPassword}
              {...field}
            />
          )}
        />
        {errors.newPassword && (
          <FormFeedback>{errors.newPassword.message}</FormFeedback>
        )}
      </div>
      <div className="mb-1">
        <Label className="form-label-font-size" for="oldPassword">
          Confirm Password
        </Label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputPasswordToggle
              className="input-group-merge"
              invalid={!!errors.confirmPassword}
              {...field}
            />
          )}
        />
        {errors.confirmPassword && (
          <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
        )}
      </div>
      <Button type="submit" color="primary" block>
        Submit
      </Button>
    </Form>
  );
}
