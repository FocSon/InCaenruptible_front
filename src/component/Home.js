import React, {useState} from 'react';
import VideoPlayer from './VideoPlayer';
import "./Home.css";
import Spinner from "./Spinner";
import CreateAlertForm from "./CreateAlertForm";

let alertAwaitingConfirmation = false;

function setAlertAwaitingConfirmation(value) {
    alertAwaitingConfirmation = value;
    console.log(alertAwaitingConfirmation);
}

const Home = () => {
    const [alertAwaitingConfirmation, setAlertAwaitingConfirmation] = useState(false);

    const alert = {} //TODO : get alert from server


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
                    alertAwaitingConfirmation ?
                        <Spinner text="Awaiting stream validation, don't leave the page ...."/>
                        :
                        <CreateAlertForm customCallback={setAlertAwaitingConfirmation}/>
                }
                </div>
        }
        </div>
    );
};

export default Home;
