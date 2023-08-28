//create Pagination and show the 10 exchanges per page using my created Get Api.
import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";
function Pagination() {
    let [exchange, setExchange] = useState([]);
    let [exchangePerPage, setExchangePerPage] = useState(10);
    let [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        axios.get('http://localhost:7000/')
            .then(response => response.data)
            .then(json => setExchange(json))
    }, [])

    let numOfTotalPages = Math.ceil(exchange.length / exchangePerPage);
    let pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
    let indexofLastTodo = currentPage * exchangePerPage;
    let indexofFirstTodo = indexofLastTodo - exchangePerPage;
    let visibleExchange = exchange.slice(indexofFirstTodo, indexofLastTodo)

    let prevPageHandler = () =>{
        if(currentPage !==1){
            setCurrentPage(currentPage-1)
        }
    }

    let nextPageHandler = () =>{
        if(currentPage !== numOfTotalPages){
            setCurrentPage(currentPage+1)
        }
    }
    return (
        <div>
            <h1>new app</h1>
            {visibleExchange.map((item) => {
                return (<div>
                    <li>{item.exchange_id}--------{item.data_symbols_count}</li>

                </div>)
            })}
            <span onClick={prevPageHandler}>prev</span>
            {<p>{pages.map((page) => {
                return (

                    <span id={page} onClick={() => setCurrentPage(page)}>{`${page}  |`}</span>

                )
            })}</p>}
            <span onClick={nextPageHandler}>next</span>
        </div>
    )
}

export default Pagination;