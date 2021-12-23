import React from 'react';

const Tooltip = ({ fieldName, message }) => {
   return (
      <div className="m-tooltip-container">
         <div className="tooltip show bs-tooltip-start">
               <div className="tooltip-arrow"></div>
               <div className={`tooltip-inner ${fieldName}`}>
                  <small>{message}</small>
               </div>
         </div>
      </div>
   );
}

export { Tooltip };
