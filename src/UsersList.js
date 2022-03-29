import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./UsersList.scss";

function Items({ currentItems }) {
  return (
    <>
      <table id="users-list-table">
        <tbody id="users-list-table-body">
          <tr id="users-list-header">
            <th>ID</th>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>

          {currentItems &&
            currentItems.map((item) => (
              <tr className="users-list-row" key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

function UsersList({ itemsPerPage, sendUserDataToDataList }) {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    async function getItemsFromAPI() {
      return fetch("https://dummyapi.io/data/v1/user", {
        method: "GET",
        headers: {
          "app-id": "623ba0ddb2cbd40f0cdeed0b",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setItems(result.data);
            setCurrentItems(result.data.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(result.data.length / itemsPerPage));
            for (let i = 0; i < result.data.length; i++) {
              getUserEmailFromAPI(result.data[i], result.data);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }

    async function getUserEmailFromAPI(user, items) {
      return fetch(`https://dummyapi.io/data/v1/user/${user.id}`, {
        method: "GET",
        headers: {
          "app-id": "623ba0ddb2cbd40f0cdeed0b",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            for (let i = 0; i < items.length; i++) {
              if (items[i].id === user.id) {
                items[i].email = result.email;
                setItems(items);
              }
            }
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
            sendUserDataToDataList(items);
          },
          (error) => {
            console.log(error);
          }
        );
    }

    const endOffset = itemOffset + itemsPerPage;
    getItemsFromAPI();
  }, [itemOffset, itemsPerPage]);

  // Invoke when user clicks to request another page in the pagination component.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

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

export default UsersList;
