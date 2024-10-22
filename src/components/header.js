import React from 'react';

const Header = () => {
  return (
    <div>
      <nav id="mainNav" class="navbar navbar-expand-lg fixed-top bg-secondary text-uppercase">
        <div class="container"><a class="navbar-brand" href="#page-top">QuizLLM</a><button class="navbar-toggler text-white bg-primary text-uppercase rounded" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i></button>
            <div id="navbarResponsive" class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/">Quiz</a></li>
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/cquiz">Custom-Quiz</a></li>
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="history">History</a></li>
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="contact">Contact</a></li>
                </ul>
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;