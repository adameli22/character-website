import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { PaginationComponent } from "../../components/Pagination";
import RMcharacter from "../../components/RMcharacter";
import imageLoader from "../../imageLoader";
import RMlogo from "../../public/RMlogo.png";
import styles from "../../styles/RM.module.css";
import { Info, RM_Character, RM_characterResults } from "../../types/RM_types";

Modal.setAppElement("#__next");

const RickAndMortyPage: NextPage<{
  characters: RM_Character[];
  page_info: Info;
}> = ({ characters, page_info }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const [_characters, setCharacters] = useState(characters);

  const handlePages = (updatePage: number) => setPage(updatePage);

  const [selectedChar, setselectedChar] = useState<RM_Character>();

  useEffect(() => {
    const fetchPage = async () => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const { results }: RM_characterResults = await res.data;
      setCharacters(results);
    };
    fetchPage();
  }, [page]);

  return (
    <div className={styles.body}>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bar_top}>
        <form className={styles.form_nosubmit}>
          <input
            className={styles.input_nosubmit}
            type="search"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className={styles.logo}>
        <Image
          src={RMlogo}
          alt="rick and morty logo"
          width="500"
          height="200"
        />
      </div>

      <div className={styles.container}>
        {_characters.map((character) => {
          return (
            <div className={styles.character} key={character.id}>
              <Link
                href={`/rickandmorty/?id=${character.id}`}
                as={`/rickandmorty/${character.id}`}
                scroll={false}
              >
                <div onClick={() => setselectedChar(character)}>
                  <Image
                    loader={imageLoader}
                    unoptimized
                    src={character.image}
                    alt={character.name}
                    className={styles.character_Image}
                    width="200"
                    height="200"
                  />

                  <div className={styles.character_info}>
                    <h3>{character.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className={styles.bar_bottom}>
        <PaginationComponent
          page={page}
          totalPages={page_info.pages}
          handlePagination={handlePages}
        />
      </div>

      {selectedChar && (
        <Modal
          className={styles.mymodal}
          isOpen={!!router.query.id}
          onRequestClose={() =>
            router.push("/rickandmorty", undefined, { scroll: false })
          }
          overlayClassName={styles.myoverlay}
        >
          <RMcharacter character={selectedChar} />
        </Modal>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character`);
  const { results, info }: RM_characterResults = await res.data;

  return {
    props: {
      characters: results,
      page_info: info,
    },
  };
};

export default RickAndMortyPage;
