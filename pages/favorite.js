import React, { useContext } from 'react';
import PeopleContext from '../components/context/PeopleProvider';
import Card from '../components/ui/Card';

const favorite = () => {
    const { favorites } = useContext(PeopleContext)
    return (
        <div>
            <h1 className="text-center py-4 text-xl font-bold text-cyan-800">Mis Personajes Favoritos de Star Wars</h1>
            <div className='flex flex-wrap'>
                {favorites.length > 0 ?
                    favorites.map((favoite, i) => {
                        return <Card key={i} p={favoite} />
                    }) : null}
            </div>
        </div>
    );
};

export default favorite;