import Link from "next/link";
import { NextPage } from "next";

import { useRouter } from "next/router";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

import { useBeer } from "../../store/useBeer";

import styles from "../../../styles/Details.module.css";

const Beer: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { beers, addToFavourites, removeFromFavourites, fetchFavourites } =
    useBeer();

  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    const favourites = fetchFavourites();
    favourites.includes(id) ? setFavourited(true) : setFavourited(false);
  }, [id, fetchFavourites]);

  const toggleFavourites = () => {
    const favourites = fetchFavourites();
    favourites.includes(id) ? removeFromFavourites(id) : addToFavourites(id);
    setFavourited(!favourited);
  };

  const beer = useMemo(() => {
    if (!beers) {
      return null;
    }
    return beers.find((beer) => beer.id.toString() === id);
  }, [beers, id]);

  return (
    <div>
      <div className={styles.link}>
        <Link href="/"> ⬅ Back</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <Image
            className={styles.picture}
            src={beer?.image_url!}
            alt={beer?.name!}
            width={100}
            height={250}
          />
        </div>
        <div>
          <div className={styles.name}>{beer?.name}</div>
          <p className={styles.brewed}>First brewed: {beer?.first_brewed}</p>
          <p> {beer?.description}</p>
          <button onClick={toggleFavourites} className={styles.favorite}>
            {!favourited ? "Add to Favourites ♡ " : "Remove from Favourites ❤️"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Beer;
