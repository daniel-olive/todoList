import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    handleDateStart: () => void;
    handleDateEnd: () => void;
    startDate: Date | null;
    endDate: Date | null;
};

export const NewDateTest = ({ startDate, endDate, handleDateStart, handleDateEnd }: Props) => {
    return (
        <div className="my-12">
            <div className="flex my-4">
                <label>Data de Início: </label>
                <div className="text-black">
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateStart}
                        dateFormat="dd-MM-yyyy"
                        isClearable
                        closeOnScroll={true}
                        showIcon
                    />
                </div>
            </div>

            <div className="flex my-4">
                <label>Data de Término: </label>
                <div className="text-black">
                    <DatePicker
                        selected={endDate}
                        onChange={handleDateEnd}
                        dateFormat="dd-MM-yyyy"
                        isClearable
                        closeOnScroll={true}
                        showIcon
                    />
                </div>
            </div>
        </div>
    );
};
