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
import SWcharacter from "../../components/SWcharacter";
import SWlogo from "../../public/starwars/SWlogo.png";
import styles from "../../styles/SW.module.css";
import { SW_Character, SW_characterResults } from "../../types/SW_types";
import { unwatchFile } from "fs";
Modal.setAppElement("#__next");

interface Props {
  characters: SW_Character[];
  characterCount: number;
  nextPage: string | null;
  previous: string | null;
}

const StarWarsPage = ({ characters, characterCount }: Props) => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const [_characters, setCharacters] = useState(characters);

  const handlePages = (updatePage: number) => setPage(updatePage);

  const [selectedChar, setselectedChar] = useState<SW_Character>();

  const [characterID, setCharacterID] = useState<string>();

  const [input, setInput] = useState("");

  function getIdFromUrl(url: string) {
    const urlId = url.split("/");
    return urlId[urlId.length - 2];
  }

  function SelectCharacter(character: SW_Character, id: string) {
    setselectedChar(character);
    setCharacterID(id);
  }

  useEffect(() => {
    const fetchPage = async () => {
      const res = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      const { results }: SW_characterResults = await res.data;
      setCharacters(results);
    };
    fetchPage();
  }, [page]);

  return (
    <>
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarComponent color={"#fcdf2b"} />
      <div className={styles.body}>
        <div className={styles.logo}>
          <Image src={SWlogo} alt="star wars logo" width="450" height="200" />
        </div>
        <div className={styles.bar_top}>
          <form className={styles.form_nosubmit}>
            <input
              className={styles.input_nosubmit}
              type="search"
              placeholder="Search... (not working yet)"
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className={styles.pagination_container}>
            <Pagination
              pageName="starwars"
              currentPage={page}
              totalItems={characterCount}
              itemsPerPage={10}
              renderPageLink={handlePages}
            />
          </div>
        </div>

        <div className={styles.container}>
          {_characters.map((character) => {
            const id = getIdFromUrl(character.url);
            return (
              <div className={styles.character} key={id}>
                <Link
                  href={`/starwars/?id=${id}`}
                  as={`/starwars/${id}`}
                  scroll={false}
                >
                  <div onClick={() => SelectCharacter(character, id)}>
                    <Image
                    
                      fill
                      src={`/starwars/characters/${id}.jpg`}
                      //src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                      alt={character.name}
                      
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

        <footer></footer>

        {selectedChar && (
          <Modal
            className={styles.mymodal}
            isOpen={!!router.query.id}
            onRequestClose={() =>
              router.push("/starwars", undefined, { scroll: false })
            }
            overlayClassName={styles.myoverlay}
          >
            <SWcharacter character={selectedChar} id={characterID} />
          </Modal>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`https://swapi.dev/api/people`);
  const { count, next, previous, results }: SW_characterResults =
    await res.data;

  return {
    props: {
      characters: results,
      characterCount: count,
      nextPage: next,
      prevPage: previous,
    },
  };
};

export default StarWarsPage;
