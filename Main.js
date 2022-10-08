import React from "react";
import Data from "./Data";

export default function Main() {
    const [dt, setdt] = React.useState(Data)
    const [sorted, setSorted] = React.useState({ sorted: "id", reversed: false })
    const [srch, setsrch] = React.useState("")

    const sortById = () => {
        setSorted({ sorted: "id", reversed: !sorted.reversed })
        const copy = [...dt]
        copy.sort((A, B) => {
            if (sorted.reversed) {
                return B.id - A.id;
            }
            return A.id - B.id;
        })
        setdt(copy)
    }

    const sortByName = () => {
        setSorted({ sorted: "name", reversed: !sorted.reversed })
        const copy = [...dt]
        copy.sort((A, B) => {
            const fnameA = `${A.fname} ${A.lname}`
            const fnameB = `${B.fname} ${B.lname}`

            if (sorted.reversed) {
                return fnameA.localeCompare(fnameB);
            }
            return fnameB.localeCompare(fnameA);
        })
        setdt(copy)
    }

    const sortByRank = () => {
        setSorted({ sorted: "score", reversed: !sorted.reversed })
        const copy = [...dt]
        copy.sort((A, B) => {
            if (sorted.reversed) {
                return A.score - B.score;
            }
            return B.score - A.score;

        })
        setdt(copy)
    }

    const search = (event) => {
        const match = dt.filter((d) =>{
           return  `${d.fname} ${d.lname}`.includes(event.target.value)
        })
        setdt(match)
        setsrch(event.target.value)
    }

    const renderData = () => {
        return dt.map((d) => {
            return (
                <tr>
                    <td>{d.id}</td>
                    <td>{d.fname} {d.lname}</td>
                    <td>{d.rank}</td>
                    <td>{d.score}</td>
                </tr>
            )
        })
    }
    return (
        <div>

            <input type="tect" placeholder=" Search name" value={srch} onChange={search} />

            <button onClick={sortById}>IdSort</button>
            <button onClick={sortByName}>NameSort</button>
            <button onClick={sortByRank}>ScoreSort (max first) </button>

            <table>
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Name </th>
                        <th> Rank </th>
                        <th> Score </th>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </table>

        </div>
    )
}