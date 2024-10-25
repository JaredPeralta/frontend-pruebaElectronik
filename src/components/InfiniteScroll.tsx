import { useEffect, useRef, ReactNode } from "react";

interface InfiniteScrollProps {
  loadMore: () => void; 
  children: ReactNode;
}

const InfiniteScroll = ({ loadMore, children }: InfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
      }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore]);

  return (
    <>
      {children}
      <div ref={observerRef} />
    </>
  );
};

export default InfiniteScroll;

