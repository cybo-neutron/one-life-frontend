import { usePubSub } from "@/context/pub_sub/usePubSub";
import { events } from "@/constants/events";
import { useEffect } from "react";

const useNotesSubscribers = () => {
  const { subscribe } = usePubSub();

  useEffect(() => {
    console.log("subscribing to files");
    subscribe(events.notes.OPEN_FILES, () => {
      console.log("Open files");
    });
  }, []);

  return {};
};

export default useNotesSubscribers;
