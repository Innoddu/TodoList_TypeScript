import React, { useState } from "react";
import { Item } from '../models/item';
import '../style/CompleteList.css';


interface CompleteListProps {
    items: Item[];
}

const ITEMS_PER_PAGE = 5;

const CompleteList: React.FC<CompleteListProps> = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const sortedItems = [...items].sort((a,b) => b.createDate - a.createDate);
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const displayedItems = sortedItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    return (
      <div className="complete-list-container">
        <h2>Completed Tasks</h2>
        <div className="complete-list">
          {displayedItems.map((item: Item) => (
            <div key={item._id} className="complete-list-item">
             <span className="item-check">✅</span>
              <span className="item-content">{item.content}</span>
              <span className="item-date">{new Date(item.createDate).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
            <div className="pagination">
                <button
                disabled={currentPage === 1 }
                onClick={() => setCurrentPage(currentPage - 1)}
                >
                Prev
                </button>
                <span>
                Page {currentPage} of {totalPages}
                </span>
                <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                >
                Next
                </button>
        </div>
      </div>
    );
  };
export default CompleteList;