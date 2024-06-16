import { Tweet } from 'react-tweet'
import './TweetPage.css'

function TweetPage() {
    
    return (
        <div>
            <h1> Barry's Perspective </h1>
            <div className="tweetbox">
                <div className="tweets"> <Tweet id="1789684389778956499" /> </div>
                <div className="tweets"> <Tweet id="1780642682445967548" /> </div>
                <div className="tweets"> <Tweet id="1780642682445967548" /> </div>
            </div>

        </div>
    )
    
}

export default TweetPage