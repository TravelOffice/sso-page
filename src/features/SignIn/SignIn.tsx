import React, { useCallback, useState } from 'react';
import {
  Button, CardText, CardTitle, Col, Form, FormFeedback, Input, Label, Row, Spinner,
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputPasswordToggle from '@components/InputPasswordToggle/InputPasswordToggle';
import Images from '@themes/Images';
import '@assets/scss/base/pages/authentication.scss';
import authProvider from '@providers/AuthProvider';
import toasty from '@components/Toasty/Toasty';
import { getRedirectUri } from '../../utils/getRedirectUriUtils';

interface SignInParams {
  tenant: string,
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

export default function SignIn() {
  const [rootAccount, setRootAccount] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { state }: any = useLocation();

  const redirectUri = getRedirectUri(window.location.search);
  const url = redirectUri || state?.redirectUri;

  // Get base domain from current url of sso page, remove prefix 'sso' from url, ex: traveloffice.vn
  let baseDomain = window.location.hostname.split('.').splice(-2).join('.');

  // Extract tenant, base domain, protocol from url to autofill in the tenant field in login form
  // and generate redirect url
  let tenant = '';
  let protocol = 'https://';
  const validUrlPattern = /^(https?:\/\/[^.]+\.[^.]+\.[^.]+)$/; // Regex for validating url, ex: tenant.example.com
  if (url && validUrlPattern.test(url)) {
    const urlObj = new URL(url);
    let rest;
    [tenant, ...rest] = urlObj.hostname.split('.');
    baseDomain = rest.join('.');
    protocol = urlObj.protocol;
  }

  const signInCallback = useCallback((params: SignInParams) => {
    setIsSigningIn(true);
    if (rootAccount) {
      authProvider.signIn(params.username, params.password).then((session) => {
        toasty.show({ title: 'Success!', type: 'success', message: 'Login successfully' });
        const jwtToken = session.getIdToken().getJwtToken();
        window.location.replace(`${url}?id_token=${jwtToken}`);
      }).catch((error: Error) => {
        toasty.show({ title: 'Error!', type: 'error', message: error.message });
      }).finally(() => {
        setIsSigningIn(false);
      });
    } else {
      const usernameTenant = `${params.tenant}#${params.username}`;
      const redirectUrl = `${protocol}${params.tenant}.${baseDomain}`;
      authProvider.signIn(usernameTenant, params.password).then((session) => {
        toasty.show({ title: 'Success!', type: 'success', message: 'Login successfully' });
        const jwtToken = session.getIdToken().getJwtToken();
        window.location.replace(`${redirectUrl}?id_token=${jwtToken}`);
      }).catch((error: Error) => {
        toasty.show({ title: 'Error!', type: 'error', message: error.message });
      }).finally(() => {
        setIsSigningIn(false);
      });
    }
  }, [rootAccount]);

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<SignInParams>({
    resolver: yupResolver(schema),
    defaultValues: { tenant },
  });

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
            <Form className="auth-login-form mt-2" onSubmit={handleSubmit(signInCallback)}>
              <div className="form-check mb-1">
                <Input
                  type="checkbox"
                  id="root-account"
                  defaultChecked={rootAccount}
                  onChange={(event) => setRootAccount(event.target.checked)}
                />
                <Label className="form-check-label" for="root-account">
                  Root account
                </Label>
              </div>
              {rootAccount ? (
                <div />
              )
                : (
                  <div className="mb-1">
                    <Label className="form-label-font-size" for="tenant">
                      Tenant
                    </Label>
                    <Controller
                      name="tenant"
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type="text"
                          invalid={!!errors.tenant}
                          {...field}
                        />
                      )}
                    />
                    {errors.tenant && <FormFeedback>{errors.tenant.message}</FormFeedback>}
                  </div>
                )}
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
