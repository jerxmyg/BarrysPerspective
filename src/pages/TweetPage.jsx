import { Tweet } from 'react-tweet'
import './TweetPage.css'

export const TweetPage = () => {
    
    return (
        <div>
            <div className="title">
                <h1>Barry's Tweets</h1>
            </div>
            <div className="tweetbox">
                <div className="tweets"> <Tweet id="1789684389778956499" /> </div>
                <div className="tweets"> <Tweet id="1780642682445967548" /> </div>
                <div className="tweets"> <Tweet id="1780642682445967548" /> </div>
                
            </div>

        </div>
    )
    
}

export default TweetPage;