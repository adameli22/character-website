import Image from "next/image";
import { RM_Character } from "../types/RM_types";
import styles from "../styles/RM.module.css";
import imageLoader from "../imageLoader";

interface Props {
  character: RM_Character;
}

const RMcharacterModel = ({ character }: Props) => {
  return (
    <div>
      <div key={character.id}>
        <article className={styles.modal_content}>
          <figure className={styles.figure}>
            <Image
              className={styles.figureImage}
              loader={imageLoader}
              unoptimized
              src={character.image}
              alt={character.name}
              width="200"
              height="200"
            />
          </figure>
          <div className={styles.modalInfo}>
            <h2>{character.name}</h2>

            <div>
              <span>Gender: </span>
              <span>{character.gender}</span>
            </div>
            <div>
              <span>Species: </span>
              <span>{character.species}</span>
            </div>
            <div>
              <span>Status: </span>
              <span>{character.status}</span>
            </div>
            <div>
              <span>Origin: </span>
              <span>{character.origin ? character.origin.name : "-"}</span>
            </div>
            <div>
              <span>Location: </span>
              <span>{character.location ? character.location.name : "-"}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default RMcharacterModel;
