import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { useBeer } from "../store/useBeer";

import Favourite from "../components/Favourite";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  const { beers, filter, setFilter } = useBeer();

  return (
    <>
      <Head>
        <title>Punk API </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Punk API Example" />
      </Head>
      <div className={styles.main}>
        <div>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.search}
          />
        </div>
        <div className={styles.container}>
          {beers.map((b) => (
            <div className={styles.beerContainer} key={b.name}>
              <Favourite id={b.id.toString()} />
              <Link href={`/beer/${b.id}`}>
                <div key={b.id} className={styles.image}>
                  <Image
                    alt={b.name}
                    src={b.image_url}
                    width={100}
                    height={250}
                  />
                  <h2>{b.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
