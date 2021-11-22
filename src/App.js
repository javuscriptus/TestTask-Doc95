import { useState } from 'react'
import Modal from './components/Modal';
import Table from './components/Table'
import { generateDaysArray } from "./utils"


const App = () => {
  let data = require('./data.json');

  const [modal, setModal] = useState({
    visibility: false,
    day: undefined,
  });

  const quantityOfDays = generateDaysArray(31);

  const handlerClickDay = (e) => {
    setModal((m) => {
      return {
        visibility: !m.visibility,
        day: e ? `2021-05-${e.target.innerText}` : undefined,
      }
    });
  }

  return (
    <>
      <Table quantityOfDays={quantityOfDays} onClickDay={handlerClickDay} data={data} />
      <Modal visibility={modal.visibility} onClose={() => handlerClickDay()} day={modal.day} />
    </>
  )

}

export default App;
