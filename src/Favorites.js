import React, { Component } from 'react'
import { fetchFavorites } from './whats_cookn_api';
import { Link } from 'react-router-dom';
import './Favorites.css';

export default class Favorites extends Component {
    state = {
        favorites: null
    }

    componentDidMount = async () => {
       
        if (!this.props.token) {
            this.props.history.push('/');
        } else {
        const data = await fetchFavorites(this.props.token)
        
        this.setState({
            favorites: data.body
        })

    }}

    render() {
        console.log(this.state.favorites)
        return (
            <div>
                <h2>Favorite Recipes</h2>
                <div className='favorite-content'>
                    {
                    
                        this.state.favorites && this.state.favorites.map((favorite) => {
                        return <div className='favorite-box'>
                           <Link to={`/detail/${favorite.id}`}
                        key={`${favorite.id}-${favorite.source_id}`}><img className='recipe-img'src={favorite.image_url} alt={favorite.title}/></Link>
                        <ul>
                            <li>Recipe: {`${favorite.title}`} 
                            </li>
                            <li>Notes: {`${favorite.notes}`}</li>
                           
                        </ul>
                        </div>
                        })
                    }
                </div>
                
            </div>
        )
    }
}
