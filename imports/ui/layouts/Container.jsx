import React, { Component } from 'react';

export const Container = (props) => {
     return(
         <div className="wrapper">
            {props.children}
            <div className="control-sidebar-bg"></div>
         </div>
     )
}
