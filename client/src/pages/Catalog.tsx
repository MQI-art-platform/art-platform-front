import { useEffect, useState } from 'react'
import artistIcon from '../assets/painters-icon.png'
import { useApiClient } from '../client/platform.api.context';
import { Artist, Painting, PaintingState } from '../client/platform.models';
import CartManager from '../session/cart.manager';


export const Catalog = () => {
    const apiClient = useApiClient()
    const [paintings, setPaintings] = useState<Painting[]>([])

    useEffect(() => {
        apiClient.getPaintings([PaintingState.ACTIVE])
            .then((response) => {
                setPaintings(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [apiClient]);

    const [artists, setArtists] = useState<Artist[]>([])
    useEffect(() => {
        apiClient.getArtists()
            .then((response) => {
                setArtists(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [apiClient, paintings])

    return (
        <div>
            <h1 className='font-title text-4xl mb-6 text-neutral-950'>Art Catalog</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 justify-center'>
                {
                    paintings.map((painting) => {
                        return (
                            <a href={`/painting?id=${painting.id}`} className='flex flex-col h-[400px] bg-neutral-100 rounded-md p-4 my-2 basis-4/12'>
                                <div className="flex bg-neutral-200 h-[60%] justify-evenly rounded-md">
                                    <img
                                        className='object-contain'
                                        src={painting.paintingImages[0].imageUrl}
                                        alt={painting.name}
                                    />
                                </div>
                                <div className="h-[20%] flex flex-col">
                                    <h2 className='text-lg font-medium text-neutral-900'>{painting.name}</h2>
                                    <p className='text-neutral-700'>Price: {painting.price}</p>
                                    <p className='text-neutral-700'>Width: {painting.dimensions.width} | Height: {painting.dimensions.height} | Depth: {painting.dimensions.depth}</p>
                                </div>
                                <a className='flex h-[10%] items-center flex-row' href="">
                                    <div className='mr-2'>
                                        <img src={artistIcon} className='max-h-[23px]' />
                                    </div>
                                    <span className='text-sm text-neutral-600'>by {artists.find((v, _) => v.userInfo.id == painting.artistId)?.userInfo?.name}</span>
                                </a>
                                <div className="h-[10%] flex justify-center">
                                    <button className='bg-orange-600 text-white rounded-full px-3'
                                        onClick={(e) => CartManager.addCartItem(painting.id)}
                                    >
                                        Buy Now
                                    </button>

                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

