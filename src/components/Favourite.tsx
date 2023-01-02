import { useEffect, useState } from "react";

import { useBeer } from "../store/useBeer";

const Favourite = ({ id }: any) => {
  const [favourited, setFavourited] = useState(false);

  const itemId = id.toString();

  const { fetchFavourites, addToFavourites, removeFromFavourites } = useBeer();

  useEffect(() => {
    const favourites = fetchFavourites();
    favourites.includes(itemId) ? setFavourited(true) : setFavourited(false);
  }, [id, fetchFavourites, itemId]);

  const toggleFavourites = () => {
    const favourites = fetchFavourites();
    favourites.includes(itemId)
      ? removeFromFavourites(itemId)
      : addToFavourites(itemId);
    setFavourited(!favourited);
  };

  return <button onClick={toggleFavourites}>{!favourited ? "♡" : "❤️"}</button>;
};

export default Favourite;
