import React, {useEffect, useState} from 'react'

export default function RoutineBlock({list, tasks, props, mainTaskList, todoSetBtn}) {
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

                <div style={{
                        height:'100%',width:'70%', paddingTop:'20px'
                    }} 
                    onClick={()=>toTodo(list.id)}
                >
                    <div style={{fontSize:'35px',width:'80%', padding:'0px 0px 0px 25px'}}>
                        {list.name}
                    </div>
                    <div style={{width:'80%',background:'grey',height:'6px',
                        margin:'20px 0px 0px 25px',borderRadius:'3px', 
                    }}>
                        <div style={{width:'100%'}}>
                            <div style={{width:`${per}%`,background:'#2FA360',height:'6px',borderRadius:'3px'}}/>
                        </div>
                    </div>
                </div>

                {list.id === mainTaskList.id ?

                <div className="hoverUp" onClick={()=>todoSetBtn(null)}
                    style={{width:'30%', height:'100%', background:'#EFEFEF'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center', height:'100%'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
                        </svg>
                        
                        <div style={{fontSize:'17px', maringLeft:'2px'}}>Remove as Main</div>
                    </div>
                </div>
                        :
                <div className="hoverUp" onClick={()=>todoSetBtn(list.id)}
                    style={{width:'30%', height:'100%', background:'#EFEFEF'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center', height:'100%'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        
                        <div style={{fontSize:'17px'}}>Select as Main</div>
                    </div>
                </div>

                }

            </div>
        </div>
    )
}
