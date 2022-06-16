import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Row, Col, Form, Label, Button, CardTitle, FormFeedback, Tooltip, Input,
} from 'reactstrap';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Images from '../../themes/Images';
import '../../assets/scss/base/pages/authentication.scss';
import authProvider from '../../providers/AuthProvider';
import InputPasswordToggle from '../../components/InputPasswordToggle/InputPasswordToggle';
import toasty from '../../components/Toasty/Toasty';

interface ResetPasswordFormData {
  verificationCode: string,
  newPassword: string,
  confirmPassword: string,
}

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .min(6, 'Authentication code must be exactly 6 characters')
    .max(6, 'Authentication code must be exactly 6 characters')
    .required('Please Enter your code'),
  newPassword: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Password is invalid',
    ),
  confirmPassword: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Password is invalid',
    ),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [newPasswordTooltipOpen, setNewPasswordTooltipOpen] = useState(false);
  const [confirmPasswordTooltipOpen, setConfirmPasswordTooltipOpen] = useState(false);
  const username = useMemo(() => params.get('username'), [params]);
  useEffect(() => {
    if (!username) {
      navigate('/error-page');
    }
  }, []);

  const resetPassword = useCallback((formData: ResetPasswordFormData) => {
    if (username != null) {
      authProvider.resetPassword(username, formData.verificationCode, formData.newPassword,
        formData.confirmPassword).then(() => {
        toasty.show({ title: 'Success!', type: 'success', message: 'Set new password success.' });
      }).catch((error: Error) => {
        toasty.show({ title: 'Error!', type: 'error', message: `${error.message}` });
      });
    }
  }, [username]);

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<ResetPasswordFormData>({ resolver: yupResolver(schema) });

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%" id="linearGradient-1">
                <stop stopColor="#000000" offset="0%" />
                <stop stopColor="#FFFFFF" offset="100%" />
              </linearGradient>
              <linearGradient x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%" id="linearGradient-2">
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%" />
                <stop stopColor="#FFFFFF" offset="100%" />
              </linearGradient>
            </defs>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: 'currentColor' }}
                  />
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  />
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  />
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  />
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  />
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">TravelOffice</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={Images.resetPassword} alt="Reset Password Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Set new Password
            </CardTitle>
            <Form className="auth-reset-password-form mt-2" onSubmit={handleSubmit(resetPassword)}>
              <div className="mb-1">
                <Label className="form-label" for="verificationCode">
                  Authentication Code
                </Label>
                <Controller
                  name="verificationCode"
                  control={control}
                  render={(props: any) => (
                    <Input
                      className="input-group-merge"
                      invalid={errors.verificationCode && true}
                      {...props.field}
                    />
                  )}
                />
                {errors.verificationCode
                && <FormFeedback>{errors.verificationCode.message}</FormFeedback>}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="new-password">
                  <span className="form-label-password">New Password</span>
                  {' '}
                  <Info id="new-password" size={14} />
                  <Tooltip
                    placement="bottom"
                    isOpen={newPasswordTooltipOpen}
                    target="new-password"
                    toggle={() => setNewPasswordTooltipOpen(!newPasswordTooltipOpen)}
                  >
                    <span>
                      Password must include at least 8 characters, 1 uppercase, 1 lowercase,
                      1 number and 1 special Case Character
                    </span>
                  </Tooltip>
                </Label>
                <Controller
                  name="newPassword"
                  rules={{ required: true }}
                  control={control}
                  render={(props: any) => (
                    <InputPasswordToggle className="input-group-merge" invalid={errors.newPassword && true} {...props.field} />
                  )}
                />
                {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="confirm-password">
                  <span className="form-label-password">Confirm new Password</span>
                  {' '}
                  <Info id="confirm-password" size={14} />
                  <Tooltip
                    placement="bottom"
                    isOpen={confirmPasswordTooltipOpen}
                    target="confirm-password"
                    toggle={() => setConfirmPasswordTooltipOpen(!confirmPasswordTooltipOpen)}
                  >
                    <span>
                      Confirm new password must be match new password
                    </span>
                  </Tooltip>
                </Label>
                <Controller
                  name="confirmPassword"
                  rules={{ required: true }}
                  control={control}
                  render={(props: any) => (
                    <InputPasswordToggle className="input-group-merge" invalid={errors.confirmPassword && true} {...props.field} />
                  )}
                />
                {errors.confirmPassword
                && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
              </div>
              <Button color="primary" block>
                Submit
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/sign-in">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-left">Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
