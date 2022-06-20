import { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import classNames from "classnames";

export function Scroller({
  children,
  className,
  listClassName,
}: {
  children?: ReactNode;
  className?: string;
  listClassName?: string;
}) {
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  function prev() {
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const itemWidth = ref.current.firstElementChild?.clientWidth ?? clientWidth;
    const isFirst = scrollLeft <= 0;

    ref.current.scrollBy({
      left: isFirst ? scrollWidth - itemWidth : -itemWidth,
      behavior: "smooth",
    });
  }

  function next() {
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const itemWidth = ref.current.firstElementChild?.clientWidth ?? clientWidth;
    const isLast = scrollLeft + clientWidth >= scrollWidth;

    ref.current.scrollBy({
      left: isLast ? -scrollLeft : itemWidth,
      behavior: "smooth",
    });
  }

  useEffect(function scrollToRandomItem() {
    const itemCount = ref.current.children.length;
    if (itemCount < 2) {
      return;
    }

    const { clientWidth } = ref.current;
    const itemWidth = ref.current.firstElementChild?.clientWidth ?? clientWidth;
    const targetIndex = Math.floor(Math.random() * (itemCount - 2)) + 1;

    ref.current.scrollTo({
      left: targetIndex * itemWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={classNames("relative", className)}>
      <button
        type="button"
        className="absolute z-10 left-0 top-0 bottom-0 p-4 text-left w-16 md:w-32 bg-gradient-to-r from-white via-white text-4xl dark:from-neutral-800 dark:via-neutral-800"
        onClick={prev}
      >
        ‹
      </button>
      <ul
        ref={ref}
        className={classNames(
          "flex overflow-auto snap-x scrollbar-thin scrollbar-thumb-gray-400",
          listClassName
        )}
      >
        {children}
      </ul>
      <button
        type="button"
        className="absolute z-10 right-0 top-0 bottom-0 p-4 text-right w-16 md:w-32 bg-gradient-to-l from-white via-white text-4xl dark:from-neutral-800 dark:via-neutral-800"
        onClick={next}
      >
        ›
      </button>
    </div>
  );
}
