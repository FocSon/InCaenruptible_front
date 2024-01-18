import React, {useState} from 'react';
import VideoPlayer from './VideoPlayer';
import "./Home.css";
import Spinner from "./Spinner";
import CreateAlertForm from "./CreateAlertForm";
import HomeService from "../service/HomeService";

const Home = () => {
    let [homeService, alert] = useState(false);

    homeService = new HomeService();

    homeService.fetchAlertPresent().then(r => {
        alert = r;
    });


    return (
        <div className="Home">
            {
                alert.length && alert.endTime < Date.now() ?
                    <div>
                        <VideoPlayer length={40}
                                     url="https://www.youtube.com/watch?v=Rq5SEhs9lws&ab_channel=Skillthrive"/>
                        <h1>Titre</h1>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et dolore magna aliqua. Nibh sit amet commodo nulla facilisi. Donec adipiscing tristique
                            risus nec
                            feugiat in. Turpis egestas pretium aenean pharetra magna ac placerat. Egestas sed sed risus
                            pretium.
                            Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Urna molestie
                            at elementum eu.</h4>
                    </div>
                    :
                    <div>
                        {
                            homeService.alertAwaitingConfirmation ?
                                <Spinner text="Awaiting stream validation, don't leave the page ...."/>
                                :
                                <div>
                                    <CreateAlertForm homeService={homeService}/>
                                    <video id="webcamVideo" width="640" height="480" autoPlay></video>
                                    <video id="remoteVideo" width="640" height="480" autoPlay></video>
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default Home;