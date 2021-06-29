import React, {useRef, useEffect} from 'react';
import styled from "styled-components";

const getSelectedLocatoinId = (value) => {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Sidebar = ({selectedLocationId, observationLocations}) => {
    // getSelectedLocatoinId actually needed? Causes the first marker select not to update to sidebar
    const id = getSelectedLocatoinId(selectedLocationId);
    const loc = observationLocations.find(loc => loc.info.id === id);
    console.log("render");
    return (
        <>
            <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
        </>
    );
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;