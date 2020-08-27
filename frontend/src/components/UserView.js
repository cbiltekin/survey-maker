import React from 'react';

const UserView = (props) => {
    const { user } = props;
    
    return (
        <div className="card p-1">
            {user.displayName}
        </div>
    );
};

export default UserView;