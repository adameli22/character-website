import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HPlogo from "../public/HPlogo.png";
import RMlogo from "../public/RMlogo.png";
import SPlogo from "../public/SPlogo.png";
import SWlogo from "../public/SWlogo.png";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [bg, setBg] = useState("");
  const [Video, setVideo] = useState("");
  function changeBg(video: any) {
    setVideo(video);
    setBg("");
  }

  return (
    <div style={{ background: bg }} className={styles.body}>
      <Head>
        <title>Character Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <video loop autoPlay muted className={styles.videoBG} src={Video} />

      <div className={styles.cards}>
        <Link href="rickandmorty">
          <div
            className={styles.card}
            onMouseOver={() => changeBg("/RMintro.mp4")}
            onMouseLeave={() => setBg("")}
          >
            <div className={styles.card_content}>
              <div className={styles.card_image}>
                <i className={styles.i}>
                  <Image
                    src={RMlogo}
                    alt="rick and morty logo"
                    width="300"
                    height="130"
                  />
                </i>
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
            onMouseOver={() => changeBg("/SWintro.mp4")}
            onMouseLeave={() => setBg("")}
          >
            <div className={styles.card_content}>
              <div className={styles.card_image}>
                <i className={styles.i}>
                  <Image
                    src={SWlogo}
                    alt="Star Wars logo"
                    width="250"
                    height="110"
                  />
                </i>
              </div>
              <div className={styles.card_info_wrapper}>
                <div className={styles.card_info_title}>
                  <h4 className={styles.h4}>
                    A long time ago in a galaxy far, far away....
                  </h4>
                  <h3 className={styles.h3}>Coming Soon</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href="">
          <div className={styles.card}>
            <div className={styles.card_content}>
              <div className={styles.card_image}>
                <i className={styles.i}>
                  <Image
                    src={HPlogo}
                    alt="Harry Potter logo"
                    width="240"
                    height="140"
                  />
                </i>
              </div>
              <div className={styles.card_info_wrapper}>
                <div className={styles.card_info_title}>
                  <h4 className={styles.h4}>
                    It does not do to dwell on dreams and forget to live.
                  </h4>
                  <h3 className={styles.h3}>Coming Soon</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href="">
          <div className={styles.card}>
            <div className={styles.card_content}>
              <div className={styles.card_image}>
                <i className={styles.i}>
                  <Image
                    src={SPlogo}
                    alt="South Park logo"
                    width="270"
                    height="150"
                  />
                </i>
              </div>
              <div className={styles.card_info_wrapper}>
                <div className={styles.card_info_title}>
                  <h4 className={styles.h4}>
                    Screw you guys, I&acute;m going home!
                  </h4>
                  <h3 className={styles.h3}>Coming Soon</h3>
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
