import Image from "next/image";
import imageLoader from "../imageLoader";
import styles from "../styles/SW.module.css";
import { SW_Character } from "../types/SW_types";

interface Props {
  character: SW_Character;
  id: any;
}

const RMcharacterModel = ({ character, id }: Props) => {
  return (
    <div>
      <div key={id}>
        <article className={styles.modal_content}>
          <Image
            className={styles.figureImage}
            loader={imageLoader}
            unoptimized
            src={`/starwars/characters/${id}.jpg`}
            alt={character.name}
            width="200"
            height="200"
          />

          <div className={styles.modalInfo}>
            <h2>{character.name}</h2>
            <div>
              <span>Gender: </span>
              <span>{character.gender}</span>
            </div>
            <div >
              <span>Species: </span>
              <span>{character.species}</span>
            </div>
            <div>
              <div>
                <span>Mass: </span>
                <span>{character.mass}</span>
              </div>
              <div>
                <span>Birth Year: </span>
                <span>{character.birth_year}</span>
              </div>
              <div>
                <span>Homeworld: </span>
                <span>{character.homeworld}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default RMcharacterModel;
