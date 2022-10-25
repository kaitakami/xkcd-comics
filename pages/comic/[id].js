import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { readFile, stat, readdir } from "fs/promises";
import { basename } from "path";
import Header from "components/Header";

const Comic = ({
  img,
  alt,
  title,
  width,
  height,
  prevId,
  nextId,
  hasNext,
  hasPrevious,
}) => {
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
          <h1 className="font-bold text-center">{title}</h1>
          <Image
            layout="responsive"
            width={width}
            height={height}
            src={img}
            alt={alt}
          />
          <p>{alt}</p>

          {/* Pagination */}
          <div className="mt-5 sm:flex m-auto text-center justify-center gap-3">
            <div>
              {hasPrevious && (
                <Link href={`/comic/${prevId}`}>
                  <button className="bg-slate-200 p-3 rounded-md mb-4 sm:mb-0">
                    Previous Comic
                  </button>
                </Link>
              )}
            </div>
            <div>
              {hasNext && (
                <Link href={`/comic/${nextId}`}>
                  <button className="bg-slate-200 p-3 rounded-md">
                    Next Comic
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const files = await readdir("./comics");
  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
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
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

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
