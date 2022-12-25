import React from 'react';

const StatusDetailsTitle = ({title, children}) => {
    return (
        <div className="status__details-title">
            {children}
            <h3 className="status__details-name">{title}</h3>
        </div>
    );
};

export default StatusDetailsTitle;