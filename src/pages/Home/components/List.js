import Item from "./Item";

const List = ({ listData, deleteData, submittingStatus }) => {
    console.log("listData", listData);
    return (
        <div className="list">
            {listData.map((item) => {
                const { note, date, time, id } = item;//寫note而不寫item.note，是因為當有資料是空值時，寫note的話就不會噴錯，但寫item.note的話會噴錯
                return (
                    <Item key={id}
                        id={id}
                        note={note}
                        date={date}
                        time={time}
                        deleteData={deleteData}
                        submittingStatus={submittingStatus}
                    />
                );
            })}
        </div>
    );
};

export default List;
