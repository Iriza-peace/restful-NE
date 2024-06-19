import React, {useState} from "react";
// import UpdateStudent from "../forms/UpdateForm";
import ModalContainer from "../forms/ModalContainer";
import { successToast, errorToast } from "../../utils/Toast";
import PropTypes from "prop-types";
import { API_URL, sendRequest } from "../../utils/Api";
import axios from "axios";

const TableComponent = ({ headers, data, loading}) => {
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredData = data.filter((item)=>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  
      
  );

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ overflowX: "auto", minHeight: "20rem" }}
      className="table-container"
    >
      <input
        type="text"
        placeholder="Search a book..."
        className="w-1/2 p-2 mt-2 border-2 border-purple-500 rounded-lg"
        value={searchQuery}
        onChange={handleSearch}
      />
        <table className="table mt-8">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              
            </tr>
          </thead>
          <tbody>
            {!loading &&
              filteredData.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key) => (
                    <td key={key} className="text-center">
                      {item[key]}
                    </td>
                  ))}
                  <td className="text-center">
                    
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      {(loading || filteredData.length === 0) && (
        <p
          className="mt-6 text-base"
          style={{
            color: "#868585",
          }}
        >
          {loading ? "Loading..." : "No results Found"}
        </p>
      )}
    </div>
  );
};

TableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TableComponent;
