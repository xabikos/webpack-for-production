import React from 'react';

const NavBar = () => (
  <nav className="navbar  navbar-dark bg-primary">
    <a className="navbar-brand" href="/">Webpack example</a>
    <ul className="nav navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="https://webpack.github.io/" target="_blank">
          Webpack homepage <span className="sr-only">(current)</span>
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="https://github.com/xabikos/webpack-for-production" target="_blank" >
          Github repo
        </a>
      </li>
    </ul>
  </nav>
);

export default NavBar;
