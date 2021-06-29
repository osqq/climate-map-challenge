import React  from 'react';
import styled from "styled-components";
import { Card, ListGroup } from 'react-bootstrap';

const StyledCard = styled(Card)`
    position: absolute;
    z-index: 9999;
    left: 1rem;
    bottom: 1rem;
`;

const Sidebar = ({selectedLocationId, observationLocations}) => {
    // Is getSelectedLocatoinId actually needed? Causes the first marker select not to update to sidebar
    // const id = getSelectedLocatoinId(selectedLocationId);
    const loc = observationLocations.find(loc => loc.info.id === selectedLocationId);
    return (
        <>
            {loc &&
                <StyledCard>
                    <Card.Header>Selected Marker</Card.Header>
                    <Card.Body>
                        <Card.Title>{loc.info.name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Id: {loc.info.id}</ListGroup.Item>
                            <ListGroup.Item>Region: {loc.info.region}</ListGroup.Item>
                            <ListGroup.Item>Position: {JSON.stringify(loc.info.position)}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </StyledCard>
            }
        </>
    );
}

export default Sidebar;