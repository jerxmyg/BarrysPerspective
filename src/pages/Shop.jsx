import './Shop.css'
import IMAGE from '../assets/bplogo.png'

export const Shop = () => {
    return (
        <div>
            <h1> Capsule #??? </h1>
            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #1 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #2 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #3 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #4 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #5 </h2>
                <h3> $50.00 </h3>
            </div>

            <div className="product-listing">
                <img className="product-img" src={IMAGE} alt='default'/>
                <h2> Item #6 </h2>
                <h3> $50.00 </h3>
            </div>
        </div>

    )
}