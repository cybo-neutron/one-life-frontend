import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

const Pomodoro = () => {
  const timerRef = useRef<NodeJS.Timeout>();
  const [pomo, setPomo] = useState({
    seconds: 0,
    minutes: 25,
    hours: 0,
    isRunning: false,
    isPaused: false,
  });

  const runPomo = useCallback(() => {
    if (pomo.seconds === 0) {
      if (pomo.minutes === 0) {
        if (pomo.hours === 0) {
          stopPomodoro();
        } else {
          setPomo((prevPomo) => ({
            ...prevPomo,
            hours: prevPomo.hours - 1,
            minutes: 59,
            seconds: 59,
          }));
        }
      } else {
        setPomo((prevPomo) => ({
          ...prevPomo,
          minutes: prevPomo.minutes - 1,
          seconds: 59,
        }));
      }
    } else {
      setPomo((prevPomo) => ({
        ...prevPomo,
        seconds: prevPomo.seconds - 1,
      }));
    }
  }, [pomo.hours, pomo.minutes, pomo.seconds]);

  // const startPomodoro = () => {
  //   clearInterval(timerRef.current);
  //   timerRef.current = setInterval(runPomo, 1000);
  // };
  const startPomodoro = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pomo.seconds === 0) {
        if (pomo.minutes === 0) {
          if (pomo.hours === 0) {
            stopPomodoro();
          } else {
            setPomo((prevPomo) => ({
              ...prevPomo,
              hours: prevPomo.hours - 1,
              minutes: 59,
              seconds: 59,
            }));
          }
        } else {
          setPomo((prevPomo) => ({
            ...prevPomo,
            minutes: prevPomo.minutes - 1,
            seconds: 59,
          }));
        }
      } else {
        setPomo((prevPomo) => ({
          ...prevPomo,
          seconds: prevPomo.seconds - 1,
        }));
      }
    }, 1000);
  }, [pomo]);

  const stopPomodoro = () => {
    setPomo((prevPomo) => ({
      ...prevPomo,
      seconds: 0,
      minutes: 25,
      hours: 0,
      isRunning: false,
      isPaused: false,
    }));
    clearInterval(timerRef.current);
  };

  const pausePomodoro = () => {
    setPomo((prevPomo) => ({
      ...prevPomo,
      isRunning: false,
      isPaused: true,
    }));
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // const handlePomodoro = useCallback(() => {
  //   if (pomo.isRunning) {
  //     pausePomodoro();
  //   } else {
  //     startPomodoro();
  //   }
  // }, [pomo]);

  const handlePomodoro = () => {
    if (pomo.isRunning) {
      pausePomodoro();
    } else {
      startPomodoro();
    }
  };

  const reduceSeconds = () => {
    runPomo();
  };

  return (
    <div className="w-full h-full bg-secondary-900  grid grid-cols-3 grid-rows-2">
      <div className="bg-secondary-700/20 backdrop-blur-xl flex flex-col items-center justify-center">
        <div className="text-2xl md:text-5xl font-bold text-secondary-300">
          {pomo.hours > 0 ? pomo.hours : `0${pomo.hours}`}:
          {pomo.minutes > 0 ? pomo.minutes : `0${pomo.minutes}`}:
          {pomo.seconds > 0 ? pomo.seconds : `0${pomo.seconds}`}
        </div>
        <div className="flex gap-2 justify-center py-2 mt-5">
          <Button
            variant={"default"}
            className="font-bold uppercase "
            onClick={handlePomodoro}
          >
            {pomo.isRunning && !pomo.isPaused ? "Pause" : "Start"}
          </Button>
          <Button
            variant={"outline"}
            className="font-bold uppercase "
            onClick={stopPomodoro}
          >
            Exit
          </Button>
          <Button
            variant={"outline"}
            className="font-bold uppercase "
            onClick={reduceSeconds}
          >
            Reduce 1 sec
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
