
import { useState, useEffect } from "react";

function Task() {
    const [userInput, setUserInput] = useState('');
    const [list, setUserList] = useState([]);

    const onUserInput = (events) => {
        // event.target.value
        console.log('events', events.target.value);
        setUserInput(events.target.value);

    }

    const uddate = (index) => {
        const newList = list.map((ele, i) => (index === i ? { ...ele, status: !ele.status } : ele));
        setUserList(newList);
        localStorage.setItem('list', JSON.stringify(newList));
    };

    const remove = (index) => {
        const newList = list.filter((ele, i) => (i !== index));
        setUserList(newList);
        localStorage.setItem('list', JSON.stringify(newList));
    };

    useEffect(() => {
        const local = localStorage.getItem('list');
        console.log('Page Refresh, fetch from local', JSON.parse(local));
        if(JSON.parse(local) !== null){
            setUserList(JSON.parse(local));
        }

    }, [])


    const onSave = () => {
        if (userInput !== '') {
            const list_ = list;
            list_.push({ status: false, toDo: userInput });
            setUserList(list_);
            localStorage.setItem('list', JSON.stringify(list));
            setUserInput('');
        }
    }

    return (<div>
        <br />
        <h2>ToDo</h2>

        <h4>Add Todo</h4>
        <input type="text" value={userInput} onChange={onUserInput} />
        <button onClick={onSave}>Insert</button>


        <hr />
        {
            list.length > 0 ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }} >
                    {list.map((e, index) => {

                        return (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: "5px 0px"

                            }} key={index}>
                                <h3 style={{ margin: "0px 10px ", backgroundColor: e.status === true ? 'green' : 'red' }}>
                                    {e.toDo}
                                </h3>
                                <button onClick={() => uddate(index)}> Update</button>
                                <button onClick={() => remove(index)}> Delete</button> </div>
                        )
                    })}
                </div>
                :
                null
        }

        <div style={{

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start'

        }}><div>
        <h2>
            Pending
        </h2>
        {
            list.map(ele => {
                return (ele.status === false ? <div >  <h3 >
                    {ele.toDo}
                </h3>  </div> : null)
            })
        }
    </div>
            <div>
                <h2>
                    Completed
                </h2>
                {
                    list.map(ele => {
                        return (ele.status === true ? <div >  <h3 >
                            {ele.toDo}
                        </h3>  </div> : null)
                    })
                }

            </div>
            
        </div>
    </div>)
}

export default Task;