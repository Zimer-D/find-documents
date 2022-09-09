import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import { DocumentItem } from "../types/types"
import DItem from "./Ditem";
import "./DocumentItems.sass"




const DocumentListItems = () => {
    const [items, setItems] = useState<DocumentItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchId, setSearchId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filterCompleted, setFilterCompleted] = useState("");
    const [sortData, setSortData] = useState("")
    const [sortDirection, setSortDirection] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const documentsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3200/documents',
            );
            setItems(result.data);
        };
        fetchData();
    }, []);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDocuments / documentsPerPage); i++) {
        pageNumbers.push(i);
    }

    const documentsData = useMemo(() => {
        let computedDocuments = items;
        if (searchId) {
            computedDocuments = computedDocuments.filter(
                item =>
                    item.id === searchId

            )
        }
        if (!searchId) {
            if (searchTerm) {
                computedDocuments = computedDocuments.filter(
                    item =>
                        item.title.toLowerCase().includes(searchTerm.toLowerCase())

                )
            }

            if (startDate) {
                computedDocuments = computedDocuments.filter(
                    item =>
                        /* eslint-disable */
                        item.date >= startDate
                )
            } else if (endDate) {
                computedDocuments = computedDocuments.filter(
                    item =>
                        /* eslint-disable */
                        item.date < endDate
                )
            }

            if (sortData) {
                sortData === "date" &&
                    (computedDocuments = computedDocuments.sort((a, b) => a.date.localeCompare(b.date)))
                sortData === "title" &&
                    (computedDocuments = computedDocuments.sort((a, b) => a.title.localeCompare(b.title)))

            }
            if (sortDirection === "DSC") {
                computedDocuments = computedDocuments.reverse()
            }
        }
        setTotalDocuments(computedDocuments.length);

        return computedDocuments.slice(
            (currentPage - 1) * documentsPerPage,
            (currentPage - 1) * documentsPerPage + documentsPerPage
        );
    }, [items, currentPage, searchTerm, filterCompleted, searchId, startDate, endDate, sortData, sortDirection]);


    const paginate = (pageNumbers: number) => setCurrentPage(pageNumbers);

    return (
        <div className='workSpace'>
            <div className="search">
                <div className="filterItem">
                    <label>ID документа: </label>
                    <input
                        type={"text"}
                        value={searchId}
                        onChange={(e) => {
                            setSearchId(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="filterItem">
                    <label>Создан: </label>
                    <>
                        <input
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                            type={"date"}
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setCurrentPage(1);
                            }}
                            max={endDate}
                        />
                        -
                        <input
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                            type={"date"}
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setCurrentPage(1);
                            }}
                            min={startDate}
                        />
                    </>
                </div>
                <div className="filterItem">
                    <label>Название документа: </label>
                    <input
                        type={"text"}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="filterItem">
                    <label>Сортировка:</label>
                    <>
                        <select
                            id="sortType"
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                            onChange={(e) =>
                                setSortData(e.target.value)
                            }>
                            <option value={""}></option>
                            <option value={"title"}>Название документа</option>
                            <option value={"date"}>Дата документа</option>
                        </select>
                        <select
                            onChange={(e) =>
                                setSortDirection(e.target.value)}
                        >
                            <option value={""}></option>
                            <option value={"ASC"}>По возрастанию</option>
                            <option value={"DSC"}>По убыванию</option>
                        </select>
                    </>
                </div>
            </div>
            <div className="documentsList">
                {!documentsData?.length &&
                    <div className="error">Документов не найдено или введены некорректные  данные</div>}
                {documentsData?.map((item) => (
                    <Fragment key={item.id}>
                        <DItem item={item} />
                    </Fragment>
                ))}
                <nav>
                    <div style={{ display: "flex" }}>
                        {pageNumbers.map((number) => (
                            <div key={number} className="page-item">
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </div>
                        ))}
                    </div>
                </nav>
            </div>

        </div>
    )
}
export default DocumentListItems

