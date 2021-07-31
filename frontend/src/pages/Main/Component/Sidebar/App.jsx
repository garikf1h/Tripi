import {Segment} from 'semantic-ui-react'
export const SidebarComponent = (props) => {
    const tripExtraData = props.props.tripExtraData;
    console.log(tripExtraData);

    return (
        <div>
            {tripExtraData.map((extra) => (
            <Segment>
                <p>{`name: ${extra.name}`}</p>
                <p>{`rating: ${extra.rating}`}</p>
                <p>{`price level: ${extra.price_level}`}</p>
                <p>{`address: ${extra.vicinity}`}</p>
            </Segment>
            ))}
        </div>
    )
}

export default {SidebarComponent};