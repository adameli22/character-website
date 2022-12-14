import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { RM_Character } from "../../types/RM_types";
import RMcharacter from "../../components/RMcharacter";
import styles from "../../styles/RM.module.css";
import classNames from "classnames";

const RM_character_page: NextPage<{ character: RM_Character }> = ({
  character,
}) => {
  return (
    <div
      className={classNames([styles.body, styles.characterPageBody].join(" "))}
    >
      <div className={styles.character_page}>
        <RMcharacter character={character} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const results: RM_Character = await res.data;

  return {
    props: {
      character: results,
    },
  };
};

export default RM_character_page;
