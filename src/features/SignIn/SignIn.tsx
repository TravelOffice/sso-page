import React, { useCallback, useState } from 'react';
import {
  Row, Col, Form, Input, Label, Button, CardText, CardTitle,
  Spinner,
  FormFeedback,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputPasswordToggle from '@components/InputPasswordToggle/InputPasswordToggle';
import Images from '@themes/Images';
import '@assets/scss/base/pages/authentication.scss';
import authProvider from '@providers/AuthProvider';
import toasty from '@components/Toasty/Toasty';

interface SignInParams {
  username: string,
  password: string,
  rememberMe: boolean,
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter username'),
  password: yup
    .string()
    .required('Please enter password'),
});

function useSignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const signIn = useCallback((params: SignInParams) => {
    setIsSigningIn(true);
    authProvider.signIn(params.username, params.password).then((session) => {
      const message = { type: 'cognito-signin', session };
      window.parent.postMessage(message, '*');
      toasty.show({ title: 'Success!', type: 'success', message: 'Login sucsessfully' });
    }).catch((error: Error) => {
      toasty.show({ title: 'Error!', type: 'error', message: error.message });
    }).finally(() => {
      setIsSigningIn(false);
    });
  }, []);
  return { signIn, isSigningIn };
}

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isSigningIn } = useSignIn();
  const {
    control, handleSubmit, formState: { errors },
  } = useForm<SignInParams>({ resolver: yupResolver(schema) });
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="d-flex align-items-center brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={Images.travelOfficeLogo} alt="TravelOffice logo" />
          <h2 className="brand-text text-primary ms-1 mb-0">TravelOffice</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={Images.login} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to TravelOffice! 👋
            </CardTitle>
            <CardText className="mb-2">Please sign-in to your account and start the adventure</CardText>
            <Form className="auth-login-form mt-2" onSubmit={handleSubmit(signIn)}>
              <div className="mb-1">
                <Label className="form-label-font-size" for="login-email">
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
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label-font-size" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className="input-group-merge" invalid={!!errors.password} {...field} />
                  )}
                />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" defaultChecked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button type="submit" color="primary" block disabled={isSigningIn}>
                {isSigningIn ? <Spinner size="sm" style={{ marginRight: 20 }} /> : 'Sign in'}
              </Button>
            </Form>
            {/* TODO Implement login with Facebook Google later /*}
            {/* <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
}
