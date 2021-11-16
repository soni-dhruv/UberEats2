import React from 'react'

function Pagination({ postPerPage, totalPost, paginate }) {

    const page_no = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        page_no.push(i);
    }

    return (
        <div>
            <nav>
                <ul className='pagination'>
                    {page_no.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)}  className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
