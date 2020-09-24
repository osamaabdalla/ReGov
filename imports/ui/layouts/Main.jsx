import React, { Component } from 'react';
const { innerHeight: height } = window;

export const Main = (props) => {
     return(
         <div className="content-wrapper" style={{minHeight:height}} >
            {props.children}
         </div>
     )
}
