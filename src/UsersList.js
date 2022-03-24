import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.


function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (

                    < div >
                        <h3>Item #{item.firstName}</h3>
                    </div>
                ))
            }
        </>
    );
}


function UsersList({ itemsPerPage }) {
    // We start with an empty list of items.


    const [items, setItems] = useState([])
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        console.log("users list component did mount")

        async function getItemsFromAPI() {
            console.log("fetching API data...")
            return fetch("https://dummyapi.io/data/v1/user", {
                method: 'GET',
                headers: {
                    'app-id': '623ba0ddb2cbd40f0cdeed0b',
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("API result:")
                        console.log(result.data)
                        setItems(result.data)
                        setCurrentItems(result.data.slice(itemOffset, endOffset));
                        setPageCount(Math.ceil(result.data.length / itemsPerPage));
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }

        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        getItemsFromAPI()

    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <button onClick={() => { console.log(items) }}></button>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default UsersList
