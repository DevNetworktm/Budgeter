import { RouteData } from "../utils/routes.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { PlusCircleFill, XCircle } from "react-bootstrap-icons"

// Chart
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Styles
import "./styles/Home.scss"
import { useEffect, useState } from "react";
import Detail from "../components/Detail.jsx";
import { InputHandler } from "../utils/index.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomeData = new RouteData({
    name: "Home",
    path: "/",
    views: Home
})


function Home() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [ details, setDetails ] = useState([]);
    const [ cash, setCash ] = useState(0);
    const [ data, setData ] = useState({
        labels: [],
        datasets: [],
    })
    const [ add, setAdd ] = useState(false);
    const [ addTag, setAddTag ] = useState(false);

    const [ prices, setPrices ] = useState(0);
    const [ type, setType ] = useState("cashIn");
    const [ label, setLabel ] = useState("");
    const [ Tag, setTag ] = useState("");
    const [ color, setColor ] = useState("")

    useEffect(() => {
        // if (!user.loggedIn) navigate(SignIn.path);
        (async () => {
            if (details[0]) {
                let CASH = 0;
                const donuts = {
                    label: "Cash",
                    data: [],
                    backgroundColor: []
                };
                const tags = [];
                setCash(0)
                for (let i of details.filter(el => el.type === "cashIn")) {
                    CASH += i.amount
                }

                for (let i of details.filter(el => el.type === "cashOut")) {
                    CASH -= i.amount;
                    const tag = tags.filter(el => el === i.tag.name)[0];
                    if (tag) {
                        tags.forEach((el, index) => {
                            if (el === i.tag.name) {
                                donuts.data[index] = donuts.data[index] + i.amount;
                            }
                        })
                    } else {
                        if (Tag === "") setTag(i.tag.name)
                        donuts.data.push(i.amount);
                        donuts.backgroundColor.push(i.tag.color)
                        tags.push(i.tag.name)
                    }
                }
                setCash(CASH)
                donuts.data.push(CASH)
                donuts.backgroundColor.push("#2BB3C0")
                setData({
                    labels: [ ...tags, "total" ],
                    datasets: [ donuts ],
                })
            } else {
                setData({
                    labels: [],
                    datasets: [],
                })
            }
        })()
    }, [])

    async function HandleAdd(e) {
        e.preventDefault()

        setCash(type === "cashIn" ? cash + parseInt(prices) : cash - parseInt(prices));

        if (!data.labels[0]) setData({
            labels: [ "total" ],
            datasets: [
                {
                    label: "Cash",
                    data: [ type === "cashIn" ? cash + parseInt(prices) : cash - parseInt(prices) ],
                    backgroundColor: [ "#2BB3C0" ]
                }
            ]
        })

        if (color === "" && type === "cashOut") {
            const donut = data.datasets[0];
            const newData = donut.data;

            for (let i in data.labels) {
                if (data.labels[i] === Tag) {
                    newData[i] = newData[i] + parseInt(prices)
                }
            }

            const newDonut = {
                label: "Cash",
                data: [ ...newData ],
                backgroundColor: [ ...donut.backgroundColor ]
            };

            setData({
                labels: [ Tag, ...data.labels ],
                datasets: [ newDonut ],
            })

        } else if (color !== "" && type === "cashOut") {
            const donut = data.datasets[0];
            const newDonut = {
                label: "Cash",
                data: [ parseInt(prices), ...donut.data ],
                backgroundColor: [ color, ...donut.backgroundColor ]
            };

            setData({
                labels: [ Tag, ...data.labels ],
                datasets: [ newDonut ],
            })
        }


        setCash(type === "cashIn" ? cash + parseInt(prices) : cash - parseInt(prices));
        const id = `${ Math.floor(Math.random() * 100000) }`
        if (details[0]) {
            setDetails(prev => prev = [ {
                _id: id,
                type: type,
                tag: Tag,
                amount: parseInt(prices),
                name: label,
                time: Date.now()
            }, ...prev ])
        } else {
            setDetails([ {
                _id: id,
                type: type,
                tag: Tag,
                amount: parseInt(prices),
                name: label,
                time: Date.now()
            } ])
        }

        setColor("")
    }


    return (
        <section id="section-home">
            <div className="chart">
                <Doughnut data={ data } options={ {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
                }
                />
                <div className="cash">
                    { cash }€
                </div>
            </div>
            <div className="container">
                <div className="wrapper">
                    <div className={ "header" }>
                        <h2 className={ "ac title-of-element" }>Details</h2>
                        <button onClick={ () => setAdd(true) }>
                            <PlusCircleFill fill={ "#2BB3C0" }/>
                        </button>
                    </div>
                    <div className="details">
                        {
                            details.map(
                                detail => <Detail key={ detail._id } type={ detail.type } amount={ detail.amount }
                                                  tag={ detail.tag } name={ detail.name } time={ detail.time }/>
                            )
                        }
                    </div>
                </div>
            </div>
            <article data-active={ add } id="add">
                <div className="wrapper">
                    <div className="head">
                        <div>
                            <h2 className={ "title-of-element" }>Add Details</h2>
                        </div>
                        <div>
                            <button onClick={ () => {
                                setAdd(false)
                                setTimeout(() => {
                                    setAddTag(false)
                                }, 1000)
                            } }>
                                <XCircle fill={ "#3f3f3f" }/>
                            </button>
                        </div>
                    </div>
                    <form onSubmit={ HandleAdd }>
                        <div className={ "form-control-home" }>
                            <input onChange={ InputHandler(setPrices) } type="number" placeholder={ "Prices" }
                                   className={ "basic-input-R size--small" }
                                   name="amount" id=""/>
                            <select onChange={ InputHandler(setType) } name="type" id=""
                                    className={ "basic-input-R size--medium" }>
                                <option value="cashIn">Cash In</option>
                                <option value="cashOut">Cash Out</option>
                            </select>
                        </div>
                        <input onChange={ InputHandler(setLabel) } type="text" placeholder={ "Label" }
                               className={ "basic-input-R" }
                               style={ { height: 30 } }/>
                        <div className="tags">
                            { type === "cashOut" ?
                                !addTag ?
                                    <>
                                        <select onChange={ InputHandler(setTag) } name="tag" id=""
                                                className={ "basic-input-R size--medium" }>
                                            { data.labels.filter(el => el !== "total").map(el => <option
                                                value={ el }>{ el }</option>) }
                                        </select>
                                        <button type="button" onClick={ () => setAddTag(true) }
                                                className={ "acButton--small round--full" }>
                                            <PlusCircleFill fill={ "#FFFFFF" }/>
                                        </button>
                                    </> : <>
                                        <input onChange={ InputHandler(setTag) } data-active={ addTag } type="text"
                                               placeholder={ "new tag" }
                                               className="basic-input-R size--minify"/>
                                        <input onChange={ InputHandler(setColor) } data-active={ addTag } type="color"
                                               placeholder={ "new tag" }
                                               className="basic-input-R size--minify"/></>
                                : null }

                        </div>
                        <button className={ "acButton--medium round--full" } type="submit">Confirmed</button>
                    </form>
                </div>
            </article>
        </section>
    )
}

export default HomeData;