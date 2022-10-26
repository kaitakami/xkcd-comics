import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import Header from "components/Header";

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-3xl font-bold text-center">Latest Comics</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-md m-auto mt-10">
          {latestComics.map((comic) => (
            <Link key={comic.id} href={`/comic/${comic.id}`}>
              <a className="mb-3 pb-3 m-auto">
                <h3 className="font-semibold text-sm text-center pb-2">
                  {comic.title}
                </h3>
                <Image
                  width={comic.width}
                  height={comic.height}
                  src={comic.img}
                  alt={comic.alt}
                />
              </a>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const files = await fs.readdir("./comics");
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
