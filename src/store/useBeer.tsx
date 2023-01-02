// @ts-nocheck
import { useState, useMemo, createContext, useContext, useEffect } from "react";

import { Beer } from "../store/types";

const useBeerController = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const url = "https://api.punkapi.com/v2/beers";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setBeers(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchFavourites = () => {
    const favouritesJSON = localStorage.getItem("favourites") || "[]";
    return JSON.parse(favouritesJSON);
  };

  const addToFavourites = (id: string) => {
    const favourites = fetchFavourites();
    const newFavourites = [...favourites, id];
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  const removeFromFavourites = (id: string) => {
    const favourites = fetchFavourites();
    const newFavourites = favourites.filter((favourite) => favourite !== id);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  const filteredBeers = useMemo(
    () =>
      beers.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())),
    [filter, beers]
  );

  return {
    filter,
    setFilter,
    beers: filteredBeers,
    addToFavourites,
    removeFromFavourites,
    fetchFavourites,
  };
};

const BeerContext = createContext<ReturnType<typeof useBeerController>>({
  filter: "",
  setFilter: () => {},
  beers: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  fetchFavourites: () => {},
});

export const BeerProvider = ({ children }) => (
  <BeerContext.Provider value={useBeerController()}>
    {children}
  </BeerContext.Provider>
);

export const useBeer = () => useContext(BeerContext);
