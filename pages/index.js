import React, { useContext, useEffect, useState } from 'react';
import PeopleContext from '../components/context/PeopleProvider';

import Card from '../components/ui/Card';


const Home = () => {
  const { _setPeople, peoples, page, wait, favorites } = useContext(PeopleContext);   

  return (
    <div className="">
            <h1 className="text-center py-4 text-xl font-bold text-cyan-800">Personajes Star Wars {favorites.length}</h1>
            <div className='flex flex-wrap'>
                {peoples.length > 0 ?
                    peoples.map((people, i) => {
                        return <Card key={i} p={people} source="h" />
                    }) : null}
            </div>
            <div className='py-4 text-center'>
                {wait ? (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl">
                    <i className='fas fa-spinner fa-pulse' ></i> Espere, cargando personajes
                </button>
                ): (
                    page === 0 ? (
                        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full">
                        No hay mas personajes
                    </button>
                    ) : (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { _setPeople(page) }}>
                        Ver mas personajes
                    </button>
                    )
                )}
                
                
            </div>
        </div>
  )
}

export default Home
