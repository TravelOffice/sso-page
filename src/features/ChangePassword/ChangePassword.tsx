import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { ChevronLeft } from 'react-feather';
import Images from '@themes/Images';
import ChangePasswordForm from './ChangePasswordForm';

export default function ChangePassword() {
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link
          className="d-flex align-items-center brand-logo"
          to="/"
          onClick={(e) => e.preventDefault()}
        >
          <img src={Images.travelOfficeLogo} alt="TravelOffice logo" />
          <h2 className="brand-text text-primary ms-1 mb-0">TravelOffice</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img
              className="img-fluid"
              src={Images.forgotPassword}
              alt="Change Password Cover"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <ChangePasswordForm />
            <p className="text-center mt-2">
              <Link
                to="/sign-in"
                className="d-flex justify-content-center align-items-center"
              >
                <ChevronLeft className="rotate-rtl me-25" size={16} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
