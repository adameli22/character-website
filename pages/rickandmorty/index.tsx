import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import NavbarComponent from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import RMcharacter from "../../components/RMcharacter";
import imageLoader from "../../imageLoader";
import RMlogo from "../../public/rickandmorty/RMlogo.png";
import styles from "../../styles/RM.module.css";
import { Info, RM_Character, RM_characterResults } from "../../types/RM_types";

Modal.setAppElement("#__next");

interface Props {
  characters: RM_Character[];
  page_info: Info;
}

const RickAndMortyPage = ({ characters, page_info }: Props) => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const [_characters, setCharacters] = useState(characters);

  const handlePages = (updatePage: number) => setPage(updatePage);

  const [selectedChar, setselectedChar] = useState<RM_Character>();

  const [input, setInput] = useState("");
  

  useEffect(() => {
    const fetchPage = async () => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${input}`
      );
      const { results }: RM_characterResults = await res.data;
      setCharacters(results);
    };
      fetchPage();
  }, [page, input]);

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Rick and Morty character list" />
        <link rel="icon" href="/rickandmorty/RMfavicon.png" />
      </Head>
    
      <div className={styles.body}>
        <div className={styles.logo}>
          <Image
            src={RMlogo}
            alt="rick and morty logo"
            width="500"
            height="200"
          />
        </div>
        <div className={styles.bar_top}>
          <form className={styles.form_search}>
            <input
              className={styles.input_search}
              type="search"
              placeholder="Search..."
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className={styles.pagination_container}>
            <Pagination
              pageName="rickandmorty"
              currentPage={page}
              totalItems={page_info.count}
              itemsPerPage={20}
              renderPageLink={handlePages}
            />
          </div>

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

        <footer className={styles.footer}>
          
        </footer>

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
    </>
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
