import React, { Component } from 'react';

export const Content = (props) => {
     return(
         <section className="content">
           <div className="container-fluid">
             <div className="row">
                    {props.children}
             </div>
           </div>
         </section>
     )
}
