import { GetStaticProps, NextPage } from "next"
import Head from 'next/head'

const HarryPotterPage: NextPage = ({characters}:any) => {
    return (
      <div>
        Harry Potter API
      </div>
      )
    }

    // export const getStaticProps: GetStaticProps = async (context) => {
    //     const res = await fetch("");
    //     const { results } = await res.json();

    //     return {
    //         props:{
    //             characters: results,
    //         },
    //     };
    // };

export default HarryPotterPage