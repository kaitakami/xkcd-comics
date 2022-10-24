import Head from "next/head";
import Image from "next/image";
import Header from "components/Header";
import { readFile, stat } from "fs/promises";

const Comic = ({ img, alt, title, width, height }) => {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold">{title}</h1>
          <Image width={width} height={height} src={img} alt={alt} />
          <p>{alt}</p>
        </section>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2580" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${prevId}.json`),
  ]);

  const hasPrevious = prevResult.status === true;
  const hasNext = nextResult.status === true;

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  };
}

export default Comic;
