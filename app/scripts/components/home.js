/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from 'react';


class Home extends React.Component {

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof Home
     */

    render() {
        let items = this.props.data?.items;
        return (
            <section id="home">
                <div className="content">
                    {items && items.map((tile) =>
                        (
                            <div key={tile._id} className="tile">
                                <h2>{tile.name}</h2>
                                <img src={tile.picture} alt=""/>
                                <h3 className="price">${tile.price}</h3>
                                <p>{tile.about}</p>
                            </div>
                        )
                    )}
                </div>
            </section>
        );
    }


}

// Export out the React Component
export default Home;