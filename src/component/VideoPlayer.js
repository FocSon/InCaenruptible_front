import ReactPlayer from "react-player";
import "./VideoPlayer.css";

const VideoPlayer = (properties) => {
    const { length } = properties.length ? properties : { length: 50 };

    const paddingTop  = 56.25 * (length/100);   // Keep the ration 18:9
    const margin = (100-length)/2;

    const playerWrapperStyle = {
        position: 'relative',
        paddingTop: `${paddingTop}%`, /* Player ratio */
        marginRight: `${margin}%`,
        marginLeft: `${margin}%`,
    };

    return (
        <div className='player-wrapper' style={playerWrapperStyle}>
            <ReactPlayer
                className='react-player'
                url='https://www.youtube.com/watch?v=Rq5SEhs9lws&ab_channel=Skillthrive'
                width='100%'
                height='100%'
            />
        </div>
    )
}

export default VideoPlayer;