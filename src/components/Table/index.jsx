import moment from 'moment';
import "./Table.scss";

const Table = ({ quantityOfDays, onClickDay, data }) => {

    const renderRow = (item) => {
        return (
            <tr key={item.id}>
                <td>{item.Fullname}</td>
                {renderDaysInfo(item.Days)}
            </tr>
        )
    };

    // TODO: Оптимизировать, использовать не find
    const renderDaysInfo = (item) => {
        let total = 0;

        const transformationTime = (minutes) => {
            return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60}`;
        }

        const renderCells = quantityOfDays.map((i, index) => {
            let time = '0'; // храним колличество времени которое провел пользователь в определенный день
            const selectedCell = item.find((c) => i === moment(c.Date)?.date());

            if (selectedCell) {
                const generateWorkTime = (provisions) => {
                    const workTime = selectedCell[provisions]
                    const modificationTime = Number(workTime.split('-')[0]) * 60 + Number(workTime.split('-')[1]);
                    return modificationTime;
                }

                const workTimeMinutesStart = generateWorkTime('Start');
                const workTimeMinutesEnd = generateWorkTime('End');
                const workTimeMinutes = workTimeMinutesEnd - workTimeMinutesStart;
                time = transformationTime(workTimeMinutes);
                total += workTimeMinutes;
                // второй способ используя moment
                // const startTime = moment(`${b.Date}T${b.Start.replace(/\-/gi, ':')}:00`);
                // const endTime = moment(`${b.Date}T${b.End.replace(/\-/gi, ':')}:00`);
                // const hours = moment.duration(endTime.diff(startTime)).hours();
                // const minutes = moment.duration(endTime.diff(startTime)).minutes();
                // time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
                // total += hours * 60 + minutes;
            }

            return <td key={`${item}_${index}`}>{time}</td>;
        });

        return (
            <>
                {renderCells}
                <td>{transformationTime(total)}</td>
            </>
        );
    };

    return (
        <div className="App">
            <table className="resp-tab">
                <thead>
                    <tr>
                        <th>User</th>
                        {quantityOfDays.map((day, index) => 
                            <th onClick={onClickDay} key={`${day}_${index}`}>{day}</th>
                        )}
                        
                        <th>Monthly total</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => renderRow(item))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;