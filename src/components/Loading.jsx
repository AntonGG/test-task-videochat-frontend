import React from "react";
import "../sass/loading.sass";
const Loading = (status) => {
  return status ? (
    <div>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
