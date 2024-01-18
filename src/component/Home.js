import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import "./Home.css";
import Spinner from "./Spinner";
import CreateAlertForm from "./CreateAlertForm";
import HomeService from '../services/HomeService';

const Home = () => {
  let [homeService, alert] = useState(false);

  homeService = new HomeService();

  homeService.fetchAlertPresent().then((r) => {
    alert = r;
  });

  return (
    <div className="content bodyColor">
      {alert.length && alert.endTime < Date.now() ? (
        <div>
          <VideoPlayer
            length={40}
            url="https://www.youtube.com/watch?v=Rq5SEhs9lws&ab_channel=Skillthrive"
          />
          <h1>Titre</h1>
          <h4>
            Lorem ipsum 
          </h4>
        </div>
      ) : (
        ""
      )}
      <div className="alertButton">
        {homeService.alertAwaitingConfirmation ? (
          <Spinner text="Awaiting stream validation, don't leave the page ...." />
        ) : (
          <div>
            <CreateAlertForm homeService={homeService} />
            <div className="video">
            <video id="webcamVideo" width="640" height="480" autoPlay></video>
              
           
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
