import React from "react";
import styled from "react-emotion";

const Pagination = ({ page, n_tx, changePage, resetExpanded }) => {
  const last = Math.ceil(n_tx / 50);
  let pages;

  if (last < 10) {
    pages = getPages(1, last);
  } else {
    if (page < 5) {
      pages = getPages(1, 9);
    } else if (page > last - 4) {
      pages = getPages(last - 8, last);
    } else {
      pages = getPages(page - 4, page + 4);
    }
  }

  function getPages(start, max) {
    const pages = [];
    for (let i = start; i <= max; i++) {
      pages.push(
        <PageButton
          key={i}
          onClick={() => {
            resetExpanded();
            changePage(i);
          }}
          selected={i === page}
        >
          {i}
        </PageButton>
      );
    }

    return pages;
  }

  return (
    <Pages>
      <Buttons>
        <PageButton
          onClick={() => {
            resetExpanded();
            changePage(page === 1 ? 1 : page - 1);
          }}
        >
          Previous
        </PageButton>
        {page > 5 && (
          <PageButton
            text={"1..."}
            onClick={() => {
              resetExpanded();
              changePage(1);
            }}
          >
            1...
          </PageButton>
        )}
        {pages}
        {page < last - 4 && (
          <PageButton
            onClick={() => {
              resetExpanded();
              changePage(last);
            }}
          >{`...${last}`}</PageButton>
        )}
        <PageButton
          onClick={() => {
            resetExpanded();
            changePage(page === last ? last : page + 1);
          }}
        >
          Next
        </PageButton>
      </Buttons>
    </Pages>
  );
};

const Pages = styled("div")({
  margin: "20px"
});
const Buttons = styled("ul")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
});

const PageButton = styled("li")(({ selected }) => ({
  border: "1px solid white",
  margin: "0 5px",
  padding: "5px",
  borderRadius: "3px",
  color: "white",
  cursor: "pointer",
  backgroundColor: selected ? "var(--green)" : null
}));
export default Pagination;
