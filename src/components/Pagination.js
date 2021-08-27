import React, { Component } from 'react'

class Pagination extends Component {
    render() {
        const {usersPerPage , totalusers, paginate } = this.props;
        const pageNumbers = [];

        for(let i=1; i <= Math.ceil(totalusers/usersPerPage); i++){
            pageNumbers.push(i);
        }
        // debugger
        return (
            <nav>
                <ul className="pagination">
                    {
                        pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <a onClick={() => paginate(number)} href="!#" className="page-link">
                                    {number}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        )
    }
}

export default Pagination
