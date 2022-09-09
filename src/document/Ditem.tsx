import { useState } from "react";
import Icon from "../utils/Icon";


const DItem = ({ item }: any) => {
    const [textVisible, setTextVisible] = useState(false)
    return (
        <>
            <div className="item" key={item.id}>
                <div
                    className="itemHead"
                    onClick={() => setTextVisible(!textVisible)}
                >
                    <div>Название:  {item.title}</div>
                    <div style={{ fontSize: "10px" }}>ID:{item.id}</div>
                    {textVisible ? <Icon name={"far fa-chevron-up"} /> : <Icon name={"far fa-chevron-down"} />}
                </div>
                {textVisible &&
                    <div>{item.text}</div>}
            </div>
        </>
    )
}
export default DItem

