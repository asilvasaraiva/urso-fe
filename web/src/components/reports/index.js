import React from 'react';
import { Redirect } from 'react-router-dom';


const Reports = ({ isLogged, myToken }) => {

  if (!isLogged) {
    window.location.reload();
  }

  // if(authorization===null){
  //   return <Redirect to="/login"/>
  // }

  return (
    <div className="ui container">
      <div className="ui horizontal divider header">
        <i className="chart line icon"></i>
        Relatórios
      </div>

      <div className='ui segment center aligned general-background'>
      <i class="big info circle icon"></i> Em breve 
      </div>
    </div>
  )
};

export default Reports;
