import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    handleDateStart: (date: Date | null) => void;
    handleDateEnd: (date: Date | null) => void;
    startDate: Date | null;
    endDate: Date | null;
};

export const DatePickerDate = ({ startDate, endDate, handleDateStart, handleDateEnd }: Props) => {
    return (
        <div className="flex flex-col items-center lg:flex-row text-black ">
            <div className="w-60 m-1">
                <label
                    htmlFor="inicio"
                    className="text-black text-sm"
                >
                    Data inicial:
                </label>
                <DatePicker
                    className="rounded-md border border-gray-500"
                    id="inicio"
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    onChange={handleDateStart}
                    swapRange
                    selectsDisabledDaysInRange
                    inline
                />
            </div>
            <div className="w-60 m-1">
                <label
                    htmlFor="termino"
                    className="text-black text-sm"
                >
                    Data término:
                </label>
                <DatePicker
                    id="termino"
                    className="rounded-md px-1 "
                    selected={endDate}
                    onChange={handleDateEnd}
                    dateFormat="yyyy-MM-dd"
                    swapRange
                    selectsDisabledDaysInRange
                    inline
                />
            </div>
        </div>
    );
};
