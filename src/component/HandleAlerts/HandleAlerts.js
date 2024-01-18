import React from 'react';
import './HandleAlerts.css'
import loginService from '../../services/login.service';
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

const HandleAlerts = () => {

    /*GetAlertRequest(){
        
        socket.on('admit:init', {
            requests: 
        });
    };*/



    if(loginService.isLoggedIn === false){
        return (
            <h2 className='handle-alerts'>Seuls les admins sont autorisés ici</h2>
        );
    }
    else{  
        //initialize socket.io  
        const socket = io('ws://localhost:8080/');
        //start admin session
        socket.emit('startAdminSession', {
            token: window.localStorage.getItem("token"),
        })
        return (
            <div>
                <h2 className='handle-alerts'>TODO</h2>
                <div>
                    <h2>Demandes</h2>
                </div>
                <div>
                    <h2>Alertes en cours</h2>
                </div>
            </div>
        );
        //Dans Demandes
            //admin:init (socket.io)
            //afficher la liste récupérée
            //ajouter les boutons pour accepter et refuser
                //Quand on accepte ou refuse
                    //api/acceptAlert ou refuseAlert (POST)
            //écouter admin:newRequest
                //Si nouvelle requête, actualiser l'affichage
            //écouter admin:requestDeleted
                //Si requête supprimée, actualiser l'affichage
            
        
        //Dans Alertes en cours
            //comment récupérer les alertes acceptées ? base de données ?
            //pour chaque alerte ajouter bouton "définir comme alerte principale", "marquer comme terminée", "supprimer alerte", "modifier"
                //pour chaque bouton, utiliser api/setMainAlert, api/deleteAlert, api/endAlert et "api/updateAlert" (POST)
        
            //...admin/watchRequest, admin:stopWatchRequest, admin:streamRequestData??
        
        //où mettre admin:endAdminSession??????
            

    }


    
};

export default HandleAlerts;
