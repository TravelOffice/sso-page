import React from 'react';

import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Button, Row } from 'reactstrap';

import Images from '@themes/Images';

import '@assets/scss/base/pages/authentication.scss';

const ErrorPage = () => (
  <div className="auth-wrapper auth-cover">
    <Row className="auth-inner m-0">
      <Link className="d-flex align-items-center brand-logo" to="/" onClick={(e) => e.preventDefault()}>
        <img src={Images.travelOfficeLogo} alt="TravelOffice logo" />
        <h2 className="brand-text text-primary ms-1 mb-0">TravelOffice</h2>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
          <p className="mb-2">Oops! 😖 The requested URL was not found on this server.</p>
          <Button tag={Link} to="/sign-in" color="primary" className="btn-sm-block mb-2">
            Back to home
          </Button>
        </div>
        <div className="w-100 text-center">
          <img className="img-fluid" src={Images.errorPage} alt="Not authorized page" />
        </div>
      </div>
    </Row>
  </div>
);

export default ErrorPage;
