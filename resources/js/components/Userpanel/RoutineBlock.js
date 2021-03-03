import React, {useEffect, useState} from 'react'

export default function RoutineBlock({list, tasks, props}) {
    useEffect(()=>{
        let done = 0;
            tasks.forEach(t => {
                if(t.completed == 0)
                    done++
            })
        if(done > 0){
            setPer(done/tasks.length * 100)
        } else {
            setPer(0);
        }
    },[])
    const [per, setPer] = useState(0);
    const toTodo = (todoId) =>{
        props.history.push(`/edit/${todoId}`);
    } //To the todo list page

    return (
        <div>
            <div className="routineBar">
                <div style={{height:'75%',width:'70%', marginTop:'15px'}} 
                    onClick={()=>toTodo(list.id)}
                >
                    <div style={{fontSize:'35px',width:'70%'}}>
                        {list.name}
                    </div>
                    <div style={{width:'70%',background:'grey',height:'6px',marginTop:'20px',
                        borderRadius:'3px'
                    }}>
                        <div style={{width:'100%'}}>
                            <div style={{width:`${per}%`,background:'#2FA360',height:'6px',borderRadius:'3px'}}/>
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}
