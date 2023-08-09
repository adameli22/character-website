import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HPlogo from "../public/harrypotter/HPlogo.png";
import RMlogo from "../public/rickandmorty/RMlogo.png";
import SWlogo from "../public/starwars/SWlogo.png";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [bg, setBg] = useState("");
  const [Video, setVideo] = useState("");
  const [poster, setPoster] = useState("");

  function changeBg(video: any, poster: any) {
    setBg("none");
    setPoster(poster);
    setVideo(video);
  }

  function stopVideo() {
    setBg("");
    setVideo("");
  }

  return (
    <div style={{ background: bg }} className={styles.body}>
      <Head>
        <title>Character Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <video
        poster={poster}
        loop
        autoPlay
        muted
        className={styles.videoBG}
        src={Video}
        preload="auto"
      />

      <div className={styles.cards}>
        <Link href="rickandmorty">
          <div
            className={styles.card}
            onMouseOver={() => changeBg("/RMintro.webm", "RMposter.png")}
            onMouseLeave={() => stopVideo()}
          >
            <div className={styles.card_content}>
              <div className={styles.card_image}>
                  <Image
                    className={styles.logo}
                    src={RMlogo}
                    alt="rick and morty logo"
                    
                  />
              </div>
              <div className={styles.card_info_wrapper}>
                <div className={styles.card_info_title}>
                  <h4 className={styles.h4}>Wubba Lubba Dub Dub!</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href="">
          <div
            className={styles.card}
            onMouseOver={() => changeBg("/SWintro.webm", "SWposter.png")}
            onMouseLeave={() => stopVideo()}

          >
            <div className={styles.card_content}>
              <div className={styles.card_image}>
                
                  <Image
                    className={styles.logo}
                    src={SWlogo}
                    alt="Star Wars logo"
                  />
                
              </div>
              <div className={styles.card_info_wrapper}>
                <div className={styles.card_info_title}>
                  <h4 className={styles.h4}>
                    A long time ago in a galaxy far, far away....
                  </h4>
                  <h3 className={styles.h3}>Coming Soon</h3>
                  {/* <div className={styles.warning}>
            Warning: The star wars tap is very slow doe to the api not being very good
                </div> */}
                </div>
              </div>
            </div>
            
          </div>
          
        </Link>      
      </div>
    </div>
  );
};

export default Home;
