import React from 'react';

const SearchBox = (props) => {

    const style = {
        top: '10px',
        padding: '5px',
        border: '1px solid #999',
        'text-align': 'center',
        'line-height': '30px',
    };

    return (
        <div className="SearchBox" style={style}>
            <input type="text" onChange={props.handleChange} placeholder = {'Enter a movie title'} />
            <button type="submit" onClick={props.handleClick} >Find movie locations</button>
        </div>
    );
};

export default SearchBox;