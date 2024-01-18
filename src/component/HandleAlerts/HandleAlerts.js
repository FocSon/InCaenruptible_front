import React from 'react';
import './HandleAlerts.css'
import loginService from '../../services/login-service';

const HandleAlerts = () => {

    if(loginService.isLoggedIn === false){
        return (
            <h2 className='handle-alerts'>Connectez vous svp</h2>
        );
    }
    else{                               
        return (
            <div>
                <h2 className='handle-alerts'   >TODO</h2>
                <div>
                    <h2>Demandes</h2>
                </div>
                <div>
                    <h2>Alertes en cours</h2>
                </div>
            </div>
        );
    }
    
};

export default HandleAlerts;