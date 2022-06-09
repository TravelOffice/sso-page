import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button, CardText, CardTitle, Form, FormFeedback, Input, Label,
} from 'reactstrap';
import authProvider from '@providers/AuthProvider';
import toasty from '@components/Toasty/Toasty';

export interface ForgotPasswordFormProps {
  onSubmitted: (username: string) => void
}

interface ForgotPasswordFormData {
  username: string,
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter username'),
});

export default function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { onSubmitted } = props;
  const forgotPasswordCallback = useCallback((params: ForgotPasswordFormData) => {
    const { username } = params;
    authProvider.forgotPassword(username).then(() => {
      onSubmitted(username);
    }).catch((error: Error) => {
      toasty.show({ title: 'Error!', type: 'error', message: error.message });
    });
  }, []);
  const {
    control, handleSubmit, formState: { errors },
  } = useForm<ForgotPasswordFormData>({ resolver: yupResolver(schema) });

  return (
    <Form className="auth-forgot-password-form mt-2" onSubmit={handleSubmit(forgotPasswordCallback)}>
      <CardTitle tag="h2" className="fw-bold mb-1">
        Forgot Password
      </CardTitle>
      <CardText className="mb-2">
        Enter your username and we&apos;ll send a verification code
        to reset the password to your email
      </CardText>
      <div className="mb-1">
        <Label className="form-label-font-size" for="username">
          Username
        </Label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              autoFocus
              type="text"
              invalid={!!errors.username}
              {...field}
            />
          )}
        />
        {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
      </div>
      <Button type="submit" color="primary" block>
        Send code
      </Button>
    </Form>
  );
}
