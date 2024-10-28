import React from 'react'

const Article = () => {
    return (
        <div>
            <article className='m-5 p-5 w-97.5 rounded border border-pink-600 border-solid' >
                <div>
                    <div id='heart'>&#128420;</div>
                    <div><img src="" alt="phone pic" /></div>
                    <div className='items-center flex flex-row justify-between mb-5'>
                        <h2>Iphone 11</h2>
                        <div>&#36;19</div>
                    </div>
                    <div id='description'>
                        Iphone 11, designed in USA
                    </div>
                    <div>&#9734;&#9734;&#9734;&#9734;</div>
                </div>
            </article>
        </div>
    )
}

export default Article