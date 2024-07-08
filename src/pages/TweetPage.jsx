import { Tweet } from 'react-tweet'
import './TweetPage.css'

export const TweetPage = () => {
    
    return (
        <div>
            <div className="title">
                <h1>Barry's Tweets</h1>
            </div>
            <div className="tweetbox">
                <div className="tweets"> <Tweet id="1572578002873257984" /> </div>
                <div className="tweets"> <Tweet id="1575476821507850240" /> </div>
                <div className="tweets"> <Tweet id="1580574821192040449" /> </div>
                
                <div className="tweets"><Tweet id="1585983422652350469" /></div>
                <div className="tweets"><Tweet id="1588553459749355521" /></div>
                <div className="tweets"><Tweet id="1739338852039282688" /></div>
            </div>
            
            <div className="audio-container">
                <audio controls autoPlay loop>
                    <source src="./audio/music.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
                    
        </div>
    )
    
}

export default TweetPage;