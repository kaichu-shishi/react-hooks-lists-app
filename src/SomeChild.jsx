// import React from "react";
// JSX表記が無いときはimport React from 'react';する必要がないということです。Reactをimportしないようにすれば、ESLintに怒られなくなります。


const SomeChild = () => {
    return (
        <>
            <div>SomeChild</div>
        </>
    )
};

export default SomeChild;