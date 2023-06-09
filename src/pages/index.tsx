import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { mutate, data, isLoading } = api.parser.parse.useMutation();
  const [url, setUrl] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center p-4">
        <form
          className="flex w-full max-w-3xl space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ url });
          }}
        >
          <input
            className="w-full rounded-md border border-blue-500 px-4 py-2 focus:outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
          />
          <button
            type="submit"
            className="py-y rounded-md bg-blue-500 px-4 font-bold text-white"
          >
            Search
          </button>
        </form>

        <div className="flex w-full max-w-3xl justify-center py-8">
          {!data && !isLoading && "Busca un articulo para comenzar"}
          {isLoading && (
            <div
              className="text-info inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          )}
          {data && (
            <article
              className="prose prose-blue w-full"
              ref={articleRef}
              dangerouslySetInnerHTML={{
                __html: `<h1>${data?.article?.title || ""}</h1>\n ${
                  data?.article?.content || ""
                }`,
              }}
            />
          )}
        </div>
      </main>

      {/* <main className="flex w-full items-center justify-center p-4">
        <div>
          <form
            className="flex w-full space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              mutate({ url });
            }}
          >
            <input
              className="w-full rounded-md border border-blue-500 px-4 py-2 focus:outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
            />
            <button
              type="submit"
              className="py-y rounded-md bg-blue-500 px-4 font-bold text-white"
            >
              Search
            </button>
          </form>
          {isLoading ? (
            <div className="prose prose-blue w-full bg-gray-400 py-8">
              Loading...
            </div>
          ) : (
            <>
              <div
                className="prose prose-blue w-full bg-gray-400 py-8"
                ref={articleRef}
                dangerouslySetInnerHTML={{
                  __html: `<h1>${data?.article?.title || ""}</h1>\n ${
                    data?.article?.content || ""
                  }`,
                }}
              />
            </>
          )}
        </div>
      </main> */}
    </>
  );
};

export default Home;
