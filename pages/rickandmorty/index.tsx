import { GetServerSideProps, NextPage } from "next"
import Head from 'next/head'
import Image from 'next/image'
import RMlogo from "../../logos/rickandmortylogo.png"
import { RM_characterResults, RM_Character, Info } from "../../types/RM_types";
import styles from '../../styles/RM.module.css'
import imageLoader from "../../imageLoader";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link";
import Modal from "react-modal";
import { useRouter } from "next/router";
import RMcharacter from "../../components/RMcharacter";



Modal.setAppElement("#__next")


const RickAndMortyPage: NextPage<{ characters: RM_Character[], page_info: Info }> = ({ characters, page_info }) => {

    const router = useRouter()

    const [page, setPage] = useState(1)

    const [_characters, setCharacters] = useState(characters)

    const [selectedChar, setselectedChar] = useState<RM_Character>()



    useEffect(() => {
        const fetchPage = async () => {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const { results }: RM_characterResults = await res.data;
            setCharacters(results)

        }
        fetchPage();

    }, [page])


    return (
        <div className={styles.body}>
            <div className={styles.logo}>
                <Image
                    src={RMlogo}
                    alt="rick and morty logo"
                    width="500"
                    height="200"
                />
            </div>
            <div className={styles.pagination}>
                <Pagination
                    count={page_info.pages}
                    className={styles.pagination}
                    page={page}
                    shape="rounded"
                    color="secondary"
                    onChange={(_, pageNumber) => setPage(pageNumber)}
                />
            </div>

            <div className={styles.container}>
                <Head>
                    <title>Rick and Morty</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {_characters.map((character) => {
                    return <div className={styles.character} key={character.id}>
                        <Link href={`/rickandmorty/?id=${character.id}`} as={`/rickandmorty/${character.id}`} scroll={false}>

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
                })}
            </div>

            <div className={styles.pagination}>
                <Pagination
                    count={page_info.pages}
                    className={styles.pagination}
                    page={page}
                    shape="rounded"
                    color="secondary"
                    onChange={(_, pageNumber) => setPage(pageNumber)}
                />
            </div>

            {selectedChar && <Modal
                className={styles.mymodal}
                isOpen={!!router.query.id}
                onRequestClose={() => router.push("/rickandmorty",undefined, { scroll: false })}
                overlayClassName={styles.myoverlay}
            >

              

                <RMcharacter character={selectedChar} />
            </Modal>}
        </div>
    )
}

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




export default RickAndMortyPage