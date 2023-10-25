import { CardAll } from "../../components/cards/cardAll";
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
interface JsonData {
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

  function groupJsonDataByDate(jsonData: JsonData[]): {
    [date: string]: JsonData[];
  } {
    const groupedData: { [date: string]: JsonData[] } = {};

    jsonData.forEach((item) => {
      const date = new Date(item.date).toISOString().split("T")[0]; // Extrai a data no formato "YYYY-MM-DD"
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });

    return groupedData;
  }
  const groupJsonData = groupJsonDataByDate(schedules);

  return (
    <div className="max-w-[1340px] mx-auto w-full">
      <Header />
      <div className="mt-6 xs:mb-8 2xs:m-1 2xs:my-3 xs:m-4 font-normal text-primary">
        <h2 className="md:text-xl lg:text-2xl">
          Agenda completa de, <span className="font-bold">{user.name}</span>
        </h2>
      </div>

      <div className="flex md:justify-evenly 2xs:flex-col xs:flex-col sm:flex-col md:items-center lg:items-start lg:justify-between lg:flex-row">
        <div
          className={`flex flex-col sm:w-full 2xs:px-1 xs:px-4 md:items-center lg:items-stretch lg:w-full} max-h-[70vh] overflow-x-hidden overflow-y-auto scroll-smooth ${style.cardWrapper}`}
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

          {/* {schedules.map((schedules, index) => {
            return (
              <CardAll
                key={index}
                id={schedules.id}
                date={schedules.date}
                name={schedules.name}
                phone={schedules.phone}
                description={schedules.description}
              />
            );
          })} */}

          {Object.keys(groupJsonData).map((date: string, dataindex: number) => {
            const formatDataBR = (dateStr: string) => {
              const [year, month, day] = dateStr.split("-");
              return `${day}/${month}/${year}`;
            };

            return (
              <div
                key={dataindex}
                className={`bg-secondary-20 pt-3 rounded-lg mb-5 flex flex-col sm:w-full 2xs:px-1  md:items-stretch lg:w-full ${style.cardWrapper}`}
              >
                <p className="2xs:text-xs bg-secondary-50 border-solid border-[1px] border-white px-1 py-[6px] rounded-md w-fit mb-3 xs:text-sm lg:text-xl font-semibold text-lg text-white">
                  {formatDataBR(date)}
                </p>
                {groupJsonData[date].map(
                  (schedule: ISchedules, index: number) => (
                    <CardAll
                      key={index}
                      id={schedule.id}
                      date={schedule.date}
                      name={schedule.name}
                      phone={schedule.phone}
                      description={schedule.description}
                    />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
