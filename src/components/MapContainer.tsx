import {
	AdvancedMarker,
	ControlPosition,
	Map,
	MapControl,
} from '@vis.gl/react-google-maps';
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent';
import { FC } from 'react';
import Checkbox from '@/shared/Checkbox';
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types';

interface MapContainerProps {
	currentHoverID: string | number;
	DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[];
	listingType: 'car' | 'experiences' | 'stay';
}

const MapContainer: FC<MapContainerProps> = ({
	currentHoverID = -1,
	DEMO_DATA,
	listingType,
}) => {
	return (
		<>
		<Map
	style={{
		width: '100%',
		height: '100%',
	}}
	defaultZoom={12}
	defaultCenter={
		DEMO_DATA.length > 0 && DEMO_DATA[0].map && DEMO_DATA[0].map.lat !== null && DEMO_DATA[0].map.lng !== null
			? { lat: DEMO_DATA[0].map.lat, lng: DEMO_DATA[0].map.lng }
			: { lat: 0, lng: 0 } // Fallback to { lat: 0, lng: 0 }
	}
	gestureHandling={'greedy'}
	mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
>
				<MapControl position={ControlPosition.TOP_CENTER}>
					<div className="z-10 mt-5 min-w-max rounded-2xl bg-neutral-100 px-4 py-2 shadow-xl dark:bg-neutral-900">
						<Checkbox
							className="text-xs text-neutral-800 xl:text-sm"
							name="search_as_i_move"
							label="Search as I move the map"
						/>
					</div>
				</MapControl>
				{DEMO_DATA.map((item) => {
					const { map } = item;
					if (!map || map.lat === null || map.lng === null) {
						return null; // Skip invalid map entries
					}

					return (
						<AdvancedMarker
							key={item.id}
							position={{ lat: map.lat, lng: map.lng }}
							clickable
							onClick={() => console.log('clicked')}
						>
							<AnyReactComponent
								isSelected={currentHoverID === item.id}
								key={item.id}
								lat={map.lat}
								lng={map.lng}
								car={listingType === 'car' ? (item as CarDataType) : undefined}
								experiences={
									listingType === 'experiences'
										? (item as ExperiencesDataType)
										: undefined
								}
								listing={
									listingType === 'stay' ? (item as StayDataType) : undefined
								}
							/>
						</AdvancedMarker>
					);
				})}
			</Map>
		</>
	);
};

export default MapContainer;
