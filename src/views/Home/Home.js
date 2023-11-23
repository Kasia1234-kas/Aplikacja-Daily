import {useEffect, useState} from "react";
import LocalStorage from "../../tools/LocalStorage";

export default function Home() {
    const uuidV4 = () => {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const tasksKey = () => 'tasks_' + LocalStorage().load('logged').login

    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [newTask, setNewTask] = useState({
        uuid: uuidV4(),
        title: '',
        done: false,
        date: new Date().toString()
    });

    useEffect(() => {
        if (loaded === false) {
            if (LocalStorage().has(tasksKey()) && tasks.length === 0) {
                setTasks(LocalStorage().load(tasksKey()))
            }

            setLoaded(true);
        }
    }, [loaded, tasks])

    useEffect(() => {
        if (loaded) {
            LocalStorage().save(tasksKey(), tasks)
        }
    }, [tasks, loaded])

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            title: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.title.trim() !== '') {
            newTask.date = new Date().toString();

            setTasks([...tasks, newTask]);
            setNewTask({
                uuid: uuidV4(),
                title: '',
                done: false,
                date: new Date()
            });
        }
    };

    const handleDelete = (task) => {
        const updatedTasks = tasks.filter((item) => item.uuid !== task.uuid);
        setTasks(updatedTasks);
    };

    const handleCheckboxChange = (event, task) => {
        setTasks((prevTasks) => prevTasks.map((item) => {
            if (item.uuid === task.uuid) {
                return {
                    ...item,
                    done: event.target.checked
                };
            }
            return item;
        }));
    }

    const formatDateToYMDHMI = (date) => {
        date = new Date(date)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const groupedTasks = tasks.reduce((acc, task) => {
        const date = formatDateToYMDHMI(task.date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(task);
        return acc;
    }, {});

    return (
        <section className="min-vh-100 pb-5">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card">
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center mb-4">
                                    <div className="form-outline flex-fill">
                                        <input type="text" id="form2" className="form-control"
                                               placeholder={'Dodaj zadanie na dziś np Kupić mleko, zatankować samochód'}
                                               value={newTask.title} onChange={handleChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-outline-success btn-sm ms-2">Dodaj</button>
                                </form>
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                                         aria-labelledby="ex1-tab-1">
                                        <ul className="list-group mb-0">
                                            {Object.entries(groupedTasks).map(([date, tasksByDate]) => (
                                                <div className={'pb-3'} key={date}>
                                                    <h4>{date}</h4>
                                                        {tasksByDate.map((task, index) => (
                                                            <li className="list-group-item w-100 align-items-center d-inline-flex border-0 mb-2 rounded justify-content-between"
                                                                style={{backgroundColor: '#f4f6f7'}} key={index}>
                                                                <div>
                                                                    <input className="form-check-input me-2 float-start" type="checkbox" value=""
                                                                           checked={task.done} onChange={(e) => handleCheckboxChange(e, task)}/>
                                                                    {task.done ? <s>{task.title}</s> : task.title}
                                                                </div>
                                                                <button className={'btn btn-sm btn-outline-danger float-end'}
                                                                        onClick={() => handleDelete(task)}>Usuń</button>
                                                            </li>
                                                        ))}
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
