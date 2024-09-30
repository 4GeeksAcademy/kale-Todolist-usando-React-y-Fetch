import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [todoList, setTodoList] = useState([]);
	const [valor, setValor] = useState("");

	useEffect(() => {
		initialList();
	}, []);

	const initialList = async () => {
		try {
            const resp = await 
			fetch("https://playground.4geeks.com/todo/users/kale", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!resp.ok) throw new Error(`Error: ${resp.status}`);
            const data = await resp.json();
            if (Array.isArray(data)){
				setTodoList(data);
			} else {
				setTodoList([]);
			}
        } catch (error) {
            console.error(error);
			setTodoList([]);
        }
	};

	const syncTasks = async (tasks) => {
        try {
            const resp = await 
			fetch("https://playground.4geeks.com/todo/users/kale", {
                method: "PUT",
                body: JSON.stringify(tasks),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!resp.ok) throw new Error(`Error: ${resp.status}`);
            await resp.json();
        } catch (error) {
            console.error(error);
        }
    };


	const agregarTarea = (e) => {
		if (e.key === 'Enter' && valor.trim()) {
			const newTodoList = [...todoList, valor];
			setTodoList(newTodoList);
			setValor('');
			syncTasks(newTodoList);
		}
	};

	const borrarTarea = (index) => {
		const newTodoList = todoList.filter((_, i) => i !== index);
		setTodoList(newTodoList);
		syncTasks(newTodoList);

	};

	const limpiarTareas = () => {
		setTodoList([]);
		syncTasks([]);

	};


	return (
		<div className="text-center container w-25 justify-content-center">
			<h1>todos</h1>
			<div className="principal">
				<ul className="list-group">
					<input
						className="titulo"
						type="text"
						value={valor}
						onChange={(e) => setValor(e.target.value)}
						onKeyDown={agregarTarea}
						placeholder="What needs to be done?"
					/>
					{todoList.length === 0 ? (
						<li className="list-group-item disabled" aria-disabled="true">No hay tareas</li>
					) : (
						todoList.map((todo, index) => (
							<li className="list-group-item list-group-item-light d-flex justify-content-between" key={index}>
								{todo} <button style={{ backgroundColor: "transparent", borderColor: "transparent" }} className="btn btn-outline-danger" onClick={() => borrarTarea(index)}>X</button>
							</li>
						))
					)}
					<li className="list-group-item text-start"><p>{todoList.length} item left</p></li>
					<li className="list-group-item">
						<button className="btn btn-danger" onClick={limpiarTareas}>Limpiar todas las tareas</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
