import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import "./UsersList.scss"
// Example items, to simulate fetching from another resources.


function Items({ currentItems }) {
    return (
        <><table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>


                {currentItems &&
                    currentItems.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))
                }

            </tbody>
        </table>

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
                        getUserEmailFromAPI(result.data[0])
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }

        async function getUserEmailFromAPI(user) {
            console.log("fetching emails...")
            return fetch(`https://dummyapi.io/data/v1/user/${user.id}`, {
                method: 'GET',
                headers: {
                    'app-id': '623ba0ddb2cbd40f0cdeed0b',
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("email call result:")
                        console.log(result)
                        let newItems = items
                        //go over newItems array
                        //pass result.email to each |item|
                        //setItems(newItems)
                        for (let i = 0; i < items.length; i++) {

                        }
                        // setItems(result.data)
                        // setCurrentItems(result.data.slice(itemOffset, endOffset));
                        // setPageCount(Math.ceil(result.data.length / itemsPerPage));
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
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                className="paginate-component"
            />
        </>
    );
}

export default UsersList
