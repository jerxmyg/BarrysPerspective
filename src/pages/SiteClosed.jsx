import './SiteClosed.css';
import './audio.css'; 

export const SiteClosed = () => {
    return (
        <>
        <div className="box">
            <h1>Barry's Perspective</h1>
            <h2>Site Closed</h2>
            <div className="card">
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" placeholder="Password..." />
            </div>
        </div>

        <div className="audio-container">
                <audio controls autoPlay loop>
                    <source src="../audio/music.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </>

    );
}

export default SiteClosed;