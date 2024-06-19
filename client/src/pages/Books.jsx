import { useEffect, useState } from "react";
import { API_DATA_LIMIT, API_URL, sendRequest } from "../utils/Api.js";
import { formatDate, formatTime } from "../utils/Utilities.js";
import TableComponent from "../components/table/TableComponent.jsx";
import TablePagination from "../components/table/TablePagination.jsx";

import ModalContainer from "../components/forms/ModalContainer.jsx";

export const Books = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({
    shown: false,
    component: null,
  });

  

  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchTableData(newPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    let response = await sendRequest(
      API_URL + `/books?page=${page}&limit=${API_DATA_LIMIT}`,
      "GET"
    );
 
    setData(response?.data?.data?.data);
    setCurrentPage(response?.data?.data?.currentPage);
    setPages(response?.data?.data?.totalPages);
    return response;
  };

  const transformData = (data) => {
    return data.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        author: item?.author,
        publisher: item?.publisher,
        publicationYear: item?.publicationYear,
        subject: item?.subject,
        
      };
    });
  };

  const tableHeaders = [
    "Id",
    "Name",
    "Author",
    "Publisher",
    "PublicationYear",
    "Subject",
  ];
  useEffect(() => {console.log(data)},[])
  return (
    <>
      <h2>List of Books</h2>
      <div className="flex w-full justify-center">
      </div>
      <TableComponent
        headers={tableHeaders}
        data={transformData(data)}
        loading={loading}
      />
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
      
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};
