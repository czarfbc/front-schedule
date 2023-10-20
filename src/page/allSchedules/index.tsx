import { Card } from "../../components/cards/cardAll";
import style from "./getall.module.css";
import { Header } from "../../components/header";
import { UseAuth } from "../../hooks/auth";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { api } from "../../server";
import { Watch } from "react-loader-spinner";

interface ISchedules {
  id: string;
  name: string;
  phone: string;
  date: Date;
  description: string;
}
export function GetAll() {
  const [date] = useState(new Date());
  const [schedules, setSchedules] = useState<Array<ISchedules>>([]);
  const { user } = UseAuth();
  const [removeLoading, setRemoveLoading] = useState(false);

  const limitBackDate = new Date();
  limitBackDate.setMonth(limitBackDate.getMonth() - 3);

  useEffect(() => {
    setRemoveLoading(false);
    api
      .get("/schedules/getall", {
        params: {
          date,
        },
      })
      .then((response) => {
        setSchedules(response.data);
        setRemoveLoading(true);
      })
      .catch((error) => console.log(error));
  }, [date]);

  return (
    <div className="max-w-[1340px] mx-auto w-full">
      <Header />
      <div className="mt-6 xs:mb-8 2xs:m-2 xs:m-4 font-normal text-primary">
        <h2 className="md:text-xl lg:text-2xl">
          Bem vindo(a), <span className="font-bold">{user.name}</span>
        </h2>
      </div>

      <div className="flex md:justify-evenly 2xs:flex-col xs:flex-col sm:flex-col md:items-center lg:items-start lg:justify-between lg:flex-row">
        <div
          className={`flex flex-col sm:w-full md:px-4 lg:px-0 md:items-center lg:items-stretch lg:w-full} max-h-[60vh] overflow-x-hidden overflow-y-auto scroll-smooth ${style.cardWrapper}`}
        >
          {!removeLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Watch
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          )}
          {schedules.map((schedules, index) => {
            return (
              <Card
                key={index}
                id={schedules.id}
                date={schedules.date}
                name={schedules.name}
                phone={schedules.phone}
                description={schedules.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
