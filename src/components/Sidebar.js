import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from '../locationGetter';

const Sidebar = ({selectedLocationId, observationLocations}) => {
    const id = getSelectedLocatoinId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);
    console.log(observationLocations);
    return <div>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;