import React, { useState, useEffect, createContext } from 'react'


import { getPeople, getMoreInfoPeople, getFilms } from '../Endpoint';
const PeopleContext = createContext()

const PeopleProvider = ({ children }) => {

    const [peoples, setPeople] = useState([]);
    const [person, setPerson] = useState({});
    const [page, setPage] = useState(1);
    const [favorites, setFavorite] = useState([]);
    const [wait, setWait] = useState(false);
    const [films, setFilms] = useState([])

    const _setPeople = async (page) => {
        let _favorites;
        if (page == 1) {
            _favorites = JSON.parse(localStorage.getItem("startWars_favorite")) ?? [];
        } else {
            _favorites = favorites;
        }
        setWait(true);
        let _peoples = peoples;
        const result = await getPeople(page);

        result.results?.map((p) => {
            _favorites.map(f => {
                if (f.name === p.name) {
                    p.favorite = true
                }
                return p
            })
            _peoples.push({
                name: p.name,
                mass: p.mass,
                height: p.height,
                birth_year: p.birth_year,
                url: p.url,
                favorite: p.favorite
            })
        });
        setPeople(_peoples);
        if (result.results.length < 10) {
            setPage(0)
        } else {
            setPage(page + 1);
        }
        setWait(false);
    };

    const _delFavorite = (p) => {
        p.favorite = false;
        const f = favorites.filter(f => {
            if (f.name !== p.name) {
                return p
            }
        })
        setFavorite(f)
        localStorage.setItem("startWars_favorite", JSON.stringify(f))
    }

    const _setFavorite = (p) => {
        p.favorite = true;
        let _favorites = favorites;
        _favorites.push(p);
        setFavorite(_favorites)

        const peo = peoples.map(peo => {
            if (peo.name === p.name) {
                peo.favorite = true
            }
            return peo
        })
        setPeople(peo)
        localStorage.setItem("startWars_favorite", JSON.stringify(_favorites))
    }

    const moreInfo = async (url) => {
        const _uri = url.split("/")
        setWait(true);
        const result = await getMoreInfoPeople(_uri[5]);
        setWait(false);
        setPerson(result)
        _getFilms(result.films)
    }

    const _getFilms = async (films) => {
        const _films = await Promise.all(
            films?.map(async (fi) => {
                const _fi = fi.split("/");
                const result = await getFilms(_fi[5])
                return {
                    title: result.title,
                    opening_crawl: result.opening_crawl,
                    director: result.director,
                    producer: result.producer
                };
            })
        )
        setFilms(_films)

    }

    useEffect(() => {
        const _fLS = JSON.parse(localStorage.getItem("startWars_favorite")) ?? [];
        setFavorite(_fLS)
        console.log("Info para Favorite", _fLS)
    }, [])

    useEffect(() => {
        console.log("Info para el HOME")
        _setPeople(page);
    }, []);

    return (
        <PeopleContext.Provider
            value={{
                _setPeople,
                wait,
                peoples,
                page,
                favorites,
                _setFavorite,
                _delFavorite,
                setPerson,
                moreInfo,
                person,
                films,
                _getFilms
            }}
        >
            {children}
        </PeopleContext.Provider>
    )
}

export {
    PeopleProvider
}

export default PeopleContext
