import { MutableRefObject, ReactNode, useRef } from "react";
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

  return (
    <div className={classNames("relative", className)}>
      <button
        type="button"
        className="absolute z-10 left-0 top-0 bottom-0 p-4 text-left w-16 md:w-32 bg-gradient-to-r from-white via-white text-4xl dark:from-neutral-800 dark:via-neutral-800"
        onClick={() => {
          ref.current?.scrollBy({
            left: ref.current.clientWidth * -0.3,
            behavior: "smooth",
          });
        }}
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
        onClick={() => {
          ref.current?.scrollBy({
            left: ref.current.clientWidth * 0.3,
            behavior: "smooth",
          });
        }}
      >
        ›
      </button>
    </div>
  );
}
