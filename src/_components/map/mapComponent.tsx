import React from 'react';

interface MapProps<T> {
    data: T[];
    renderItem: React.ComponentType<{ item: T; index: number }>;
}

const MapComponent = <T,>({ data, renderItem: RenderComponent }: MapProps<T>) => {
    return (
        <>
            {data.map((value, index) => (
                <RenderComponent key={index} item={value} index={index} />
            ))}
        </>
    );
};

export default MapComponent;
