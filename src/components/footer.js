import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer 
        className="text-center footer" 
        style={{
          padding: '10px', // Reduce padding
          fontSize: '14px', // Smaller font size
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4" style={{ fontSize: '16px' }}>Location</h4>
              <p style={{ margin: 0 }}>Keshav Memorial Institute Of Technology<br />Narayanaguda, Hyderabad</p>
            </div>
            <div className="col-md-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase" style={{ fontSize: '16px' }}>Around the Web</h4>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a className="btn btn-outline-light text-center btn-social rounded-circle" role="button" target="blank" href="https://www.instagram.com/jashwanth_reddy9/">
                    <i className="fa fa-instagram fa-fw"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn btn-outline-light text-center btn-social rounded-circle" role="button" target="blank" href="https://www.linkedin.com/in/jashwanth-geereddy/">
                    <i className="fa fa-linkedin fa-fw"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn btn-outline-light text-center btn-social rounded-circle" role="button" target="blank" href="https://twitter.com/jashwanth_09">
                    <i className="fa fa-twitter fa-fw"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn btn-outline-light text-center btn-social rounded-circle" role="button" target="blank" href="https://www.youtube.com/@Sizzlytickle">
                    <i className="fa fa-youtube fa-fw"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4 className="text-uppercase mb-4" style={{ fontSize: '16px' }}>About Us</h4>
              <p className="lead mb-0" style={{ fontSize: '14px', margin: 0 }}>
                <span>We are students of KMIT</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
