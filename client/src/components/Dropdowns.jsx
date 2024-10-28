import React from 'react'

const Dropdowns = () => {
    return (
        <div className='md:w-1/2 mx-auto' >
            <div className='flex flex-wrap justify-between items-center'>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Phone type</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Price</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Review</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Color</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Material</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Offer</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">All filters</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
                <div>
                    <select name="categories" id="categories">
                        <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer">Sort by</a></option>
                        <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer">Audio</a></option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default Dropdowns