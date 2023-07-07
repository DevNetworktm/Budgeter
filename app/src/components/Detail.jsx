import "./styles/Detail.scss"
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import moment from "moment";

function Detail({ type, amount, tag, name, time }) {
    return (
        <div className="detail">
            <div className="icon">
                { type === "cashIn" ? <><ArrowUp fill={ "#05c515" }/></> : <><ArrowDown fill={ "#f31414" }/></> }
            </div>
            <div className="amount">
                <p>{ type === "cashIn" ? "+ " : "- " }{ amount }€</p>
            </div>
            <div className="name" title={ type === "cashOut" ? tag.name : "" }
                 style={ { borderColor: type === "cashOut" ? tag.color : "transparent" } }>
                <h3>{ name }</h3>
            </div>
            <div className="time">
                <p>{ moment(parseInt(time)).fromNow(true) }</p>
            </div>
        </div>
    )
}

export default Detail