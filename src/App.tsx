import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";

interface IMessage {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: chatContainerRef.current,
      rootMargin: "300px",
    });

    if (observer && scrollTopRef.current) {
      observer.observe(scrollTopRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [messages]);

  const fetchMessage = (limit = 10) => {
    const skip = limit * page;

    fetch(`https://dummyjson.com/comments?skip=${skip}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [...prev, ...data.comments]);
        setPage((prev) => prev + 1);

        if (data.comments.length < limit) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const first = entries[0];

    if (first.isIntersecting && hasMore) {
      fetchMessage();
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex justify-center items-center">
      <div
        className="h-[36rem] w-[20rem] bg-gray-800 rounded-md p-4 overflow-auto flex flex-col-reverse gap-4"
        ref={chatContainerRef}
      >
        {messages.map((message) => (
          <Message message={message.body} sender="hh" key={message.id} />
        ))}
        <div ref={scrollTopRef} />
      </div>
    </div>
  );
}

export default App;
