import React from 'react';

const SearchPopup: React.FC = () => {
  return (
    <>
      {/* Search Popup */}
      <div className="search-popup">
        <div className="search-popup__overlay search-toggler"></div>
        <div className="search-popup__content">
          <form>
            <label htmlFor="search" className="sr-only">search here</label>
            <input type="text" id="search" name="s" placeholder="Search Here..." />
            <button type="submit" aria-label="search submit" className="thm-btn">
              <i className="icon-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchPopup;
