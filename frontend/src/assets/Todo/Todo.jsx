import React, { useState } from 'react'

function InputData() {
    let [InputValue, setInputValue] = useState("");
    let [listData, setListData] = useState([]);


    let AddTask = (e) => {
        if (InputValue != []) {
            setListData((listData) => {
                const updatedList = [...listData, InputValue]
                setInputValue("");
                return updatedList
            })
        }
    }

    let HandleClick = (e) => {

        if (InputValue != [] && e.key === "Enter") {
            setListData((listData) => {
                const updatedList = [...listData, InputValue]
                setInputValue("");
                return updatedList
            })
        }
    }

    function RemoveItem(i) {
        const UpdateList = listData.filter((data, id) => {
            return i != id;
        })
        setListData(UpdateList)
    }
    return (
        <>
            <div className='box'>
                <div className='box2'>
                    <h2 className='h2'>TODO LIST</h2>
                    <input type="text" id="Input" className='input' placeholder='Enter the todo task here...' value={InputValue} onKeyDown={HandleClick} onChange={(e) => setInputValue(e.target.value)} />
                    <button className='btn2' onClick={AddTask}>Add Task</button>
                </div>
                {
                    listData.map((item, i) => {
                        return (
                            <div key={i} className='ListItem'>
                                <li className='item'>{item}</li>
                                <button className='btn3' onClick={() => RemoveItem(i)}> Remove</button>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default InputData