import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { RM_Character } from "../../types/RM_types";
import RMcharacter from "../../components/SWcharacter";
import styles from "../../styles/SW.module.css";
import classNames from "classnames";
import SWcharacter from "../../components/SWcharacter";
import { SW_Character } from "../../types/SW_types";

const SW_character_page: NextPage<{ character: SW_Character }> = ({
  character,
}) => {
  return (
    <div
      className={classNames([styles.body, styles.characterPageBody].join(" "))}
    >
      <div className={styles.character_page}>
        <SWcharacter character={character} id={undefined} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(
    `https://swapi.dev/api/people/${context.query.id}`
  );
  const results: SW_Character = await res.data;

  return {
    props: {
      character: results,
    },
  };
};

export default SW_character_page;
