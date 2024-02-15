"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "@/app/action";

export type AnimeCard = JSX.Element;
let page = 2;

function LoadMore() {
  const [wasInView, setWasInView] = useState<boolean>();
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView && !wasInView) {
      setWasInView(true);
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
        setWasInView(false);
      });
    }
  }, [inView, data, wasInView]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div>
          <Image
            src="./spinner.svg"
            ref={ref}
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
