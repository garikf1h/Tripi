import {Segment} from 'semantic-ui-react'
import {Button, Divider} from "@material-ui/core";
import React from "react";
export const SidebarComponent = (props) => {
    console.log(props.sidebarData)
    const sidebarData = props.sidebarData;


    return (
        <div>
            {sidebarData.tripData.map( (trip) => (
                <Segment>
                    <p>{trip.name}</p>
                    <Divider />
                    <p>{`${trip.shortDescription}`}</p>
                    <Divider />
                    <p>{trip.Product_url}</p>
                    <Divider />
                </Segment>
                ))}
             {sidebarData.hotelData.map( (hotel) => (
                <Segment>
                    <p>{hotel.name}</p>
                    <Divider />
                    <p>{`${hotel.rating}`}</p>
                    <Divider />
                    <p>{hotel.vicinity}</p>
                    <Divider />
                </Segment>
                ))}
            {sidebarData.restData.map( (rest) => (
                <Segment>
                    <p>{rest.name}</p>
                    <Divider />
                    <p>{`${rest.rating}`}</p>
                    <Divider />
                    <p>{rest.vicinity}</p>
                    <Divider />
                </Segment>
                ))}

        </div>
    )
}

export default {SidebarComponent};