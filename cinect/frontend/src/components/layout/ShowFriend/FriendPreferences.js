import React from 'react';

const FriendPreferences = (props) => {
    return (
        <div className='info-preferences'>
            <div className='text-lower1'>
                Preferences
            </div>
            <div className='margin-preferences'>
                <div className='text-lower'>
                    Favourite Movie
                </div>
                <div className='text-preferences-higher'>
                    Inglorious Bastards
                </div>
                <div className='text-lower'>
                    Favourite Series
                </div>
                <div className='text-preferences-higher'>
                    Dark
                </div>
                <div className='text-lower'>
                    Time spent watching movies
                </div>
                <div className='text-preferences-higher'>
                    {(Math.round(props.timeMovies/60 * 100) / 100).toFixed(2) + "h"}
                </div>
                <div className='text-lower'>
                    Time spent watching series
                </div>
                <div className='text-preferences-higher'>
                    {props.timeSeries + "h"}
                </div>

            </div>
        </div>
    );
};

export default FriendPreferences;