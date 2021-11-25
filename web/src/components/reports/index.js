import React from 'react';
import { Redirect } from 'react-router-dom';


const Reports = ({isLogged,myToken})=>{

  if(!isLogged){    
    return <Redirect to="/login"/>
  }

  // if(authorization===null){
  //   return <Redirect to="/login"/>
  // }

  return (
    <div className="ui horizontal divider header">
      <i className="chart line icon"></i>
      Relatórios      
    </div>
  )
};

export default Reports;
