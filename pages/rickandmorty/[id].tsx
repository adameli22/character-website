import { GetServerSideProps, NextPage } from "next"
import Image from 'next/image'
import axios from "axios"
import RMlogo from "../../logos/rickandmortylogo.png"
import { RM_Character, RM_characterResults } from "../../types/RM_types";
import styles from '../../styles/RM.module.css'
import Link from "next/link";
import imageLoader from "../../imageLoader";

const RM_character_page: NextPage<{ character: RM_Character }> = ({ character }) => {
    return (
        <div >

            <div className={styles.logo}>
                <Image
                    src={RMlogo}
                    alt="rick and morty logo"
                    width="500"
                    height="200"
                />
            </div>

            <div className={styles.popup} key={character.id}>

                <article className={styles.popup_content}>
                    <i className={styles.popup_close}></i>
                    <div className={styles.popup_a}>
                        <Image
                            loader={imageLoader}
                            unoptimized
                            src={character.image}
                            alt={character.name}
                            width="200"
                            height="200"
                        />
                    </div>
                    <div className={styles.popup_b}>
                        <h2>{character.name}</h2>

                        <div >
                            <span>Gender: </span><span>{character.gender}</span>
                        </div>
                        <div >
                            <span>Species: </span><span>{character.species}</span>
                        </div>
                        <div >
                            <span>Status: </span><span>{character.status}</span>
                        </div>
                        <div >
                            <span>Origin: </span><span>{character.origin ? character.origin.name : '-'}</span>
                        </div>
                        <div >
                            <span>Location: </span><span>{character.location ? character.location.name : '-'}</span>
                        </div>

                    </div>
                </article>
            </div>
        </div>



    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await axios.get(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const results: RM_Character = await res.data;

    return {
        props: {
            character: results
        },
    };
};

export default RM_character_page