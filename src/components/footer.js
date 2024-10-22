import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer class="text-center footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4">Location</h4>
                    <p>Keshav Memorial Institute Of Technology<br/>Narayanaguda, Hyderabad</p>
                </div>
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase">Around the Web</h4>
                    <ul class="list-inline">
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" target='blank' href="https://www.instagram.com/jashwanth_reddy9/"><i class="fa fa-instagram fa-fw"></i></a></li>
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" target='blank' href="https://www.linkedin.com/in/jashwanth-geereddy/"><i class="fa fa-linkedin fa-fw"></i></a></li>
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" target='blank' href="https://twitter.com/jashwanth_09"><i class="fa fa-twitter fa-fw"></i></a></li>
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" target='blank' href="https://www.youtube.com/@Sizzlytickle"><i class="fa fa-youtube fa-fw"></i></a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h4 class="text-uppercase mb-4">About US</h4>
                    <p class="lead mb-0"><span>We are students of KMIT</span></p>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default Footer;
