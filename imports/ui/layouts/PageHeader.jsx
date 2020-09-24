import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const PageHeader = (props) => {
     return(
     <section className="content-header">
       <h1>
         {props.title}
         {props.link && <Link to={props.link} className="btn btn-default btn-flat">{props.linkText}</Link>}
       </h1>
     </section>
     )
}


PageHeader.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string
};

PageHeader.defaultProps = {
  title: '',
  link: '',
  linkText: ''
};
