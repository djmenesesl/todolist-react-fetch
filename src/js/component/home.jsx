//import React from "react";
import React, { useEffect, useState } from 'react';

//create your first component
export function Home () {
	const [list, setList]= useState([]);
	const [input, setInput]= useState("");
    const [count, setCount] = useState(0);
    const API_URL="https://assets.breatheco.de/apis/fake/todos/user/" 

    const createUser = async () => {  
        const response = await fetch(API_URL+'djmenesesl', {
            method: "POST",
            body: JSON.stringify([]),
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                return response.json()       
            }
            new Error("Ocurrio un error en la solicitud")
        }) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }

    const deleteUser = async () => {  
        const response = await fetch(API_URL+'djmenesesl', {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                response.json()
                createUser()
                setList([])       
            }
            new Error("Ocurrio un error al eliminar User")
        }) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }

    const createTask = () => {
        const newTasks = [...list,{ "label": input, "done": false }]
        const request = fetch (API_URL+'djmenesesl', {
            method: "PUT",
            body: JSON.stringify(
                newTasks 
            ),
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                
                return response.json()       
            }
            new Error("Ocurrio un error en la creacion de la tarea")
        }) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
        return request
    }
    console.log()

    const getTask = () => {
            const request = fetch (API_URL+'djmenesesl')
            .then(response => {
                console.log(response)
                if (response.ok){
                    
                    return response.json()       
                }
                new Error("Ocurrio un error al crear la tarea")
            }) 
            .then(json => {
                console.log(json)
                setList(json)
            return json
            }
            )
            .catch(err => console.log(err))
        return request    
    }

    const addTodo = async (todo) => {
        const newTodo = {
            done: false,
            label: todo,
            //id: Math.random(),
            //todo: todo,
        };
       
        const taskCreation = await createTask()
        //agregar todo a la lista 
         const update = await getTask()
            
        //clear input box
        setInput("")
    };

    
    const deleteTodo = async (i) => {
        const newList = list.filter((todo, index) => index !== i);
        if (newList.length == 0){
            await deleteUser()
            setList([])
        } 
        
        else {const response = await fetch(API_URL+'djmenesesl', {
            method: "PUT",
            body: JSON.stringify(
                newList 
            ),
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                
                return response.json()       
            }
            new Error("Ocurrio un error en la creacion de la tarea")
        }) 
        .then(json => {
            console.log(json)
            getTask()
        })
        .catch(err => console.log(err))
    }}
        
    
    useEffect(()=> {
        //createUser()
        //createTask()
        getTask()
    },[])

	return (
		<div className="text-center container">
			
			<h1>todos</h1>
			<input 
			type="text"
			placeholder="What needs to be done?"
			value={input}
			onChange={e => setInput(e.target.value)}
			onKeyDown={(e) => {
                if (e.key == "Enter") {
                    addTodo(input, setCount(count + 1))
                }}}
			/>

			<ul>
				{list.map((todo, i) => {
					return (
						<li key={i}>{todo.label} <button className="boton" onClick={() => deleteTodo(i, setCount(count - 1))}>X</button></li>
					)

				})}
			</ul>
            <div className="contador">{count} item left </div>
            <br />
            <div>
                <button className='btn btn-danger' onClick={(e) => {deleteUser(), setCount((num) => {
                    return num = 0
                })}}>Borrar todo</button>
            </div>    
		</div>
	);
    
};

export default Home;
