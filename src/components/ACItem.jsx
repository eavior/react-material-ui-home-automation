import React from "react";

const ACItem = (props) => {
  const { item } = props;

  return (
    <>
      <button>
        type="button"
        {item.id}
      </button>
    </>
  );
};

export default ACItem;
