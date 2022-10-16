import { GetServerSideProps, NextPage } from "next"
import axios from "axios"
import { RM_Character } from "../../types/RM_types";
import RMcharacter from "../../components/RMcharacter";
import styles from '../../styles/RM.module.css'


const RM_character_page: NextPage<{ character: RM_Character }> = ({ character }) => {
    return (
        <div className={styles.body}>
            <div>
                <RMcharacter character={character} />
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