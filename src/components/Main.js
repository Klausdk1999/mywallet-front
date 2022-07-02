import {React,useEffect,useState,useContext} from "react";
import styled from 'styled-components';
import dayjs from "dayjs";
import locale from  "dayjs/locale/pt-br";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Today(){

    const navigate = useNavigate();

    const [transactions,setTransactions]=useState([]);
    
    const { user , setUser} = useContext(UserContext);
    
    const {name,token} = user;
 
    const now = dayjs().locale("pt-br");

    function loadTransactions(){
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.get(`http://localhost:5000/transactions`,config);
    
        promise.then(resposta => {
            setTransactions(resposta.data);
        });
        
    }

    useEffect(() => {
        loadTransactions();
        
    }, []);

    return(
        <>
        <Header>
            <h1>Olá, {name}</h1>     
            <ion-icon onClick={()=>navigate("/")} name="log-out-outline"></ion-icon>
        </Header>
        <Page>
            <Register>
                {transactions.map((transaction) => transaction.type==="positive"?(
                    <Container><Data>{transaction.date}</Data>{transaction.description}<h3>{transaction.value}</h3></Container>
                ):(
                    <Container><Data>{transaction.date}</Data>{transaction.description}<h2>{transaction.value}</h2></Container>
                ))}
            </Register>
            <Container>
            <Button onClick={()=>navigate("/adicionar")}>
                <Column>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <Text>Nova entrada</Text>
                </Column>
            </Button>
            <Button onClick={()=>navigate("/remover")}>
                <Column>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <Text>Nova saída</Text>
                </Column>
            </Button>
            </Container>
        </Page>
        </>
    )
    
}

const Header=styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color:#8C11BE ;
    justify-content: space-between;
    position:fixed;
    top:0;
    right:0;
    h1{
        margin:18px; 
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    ion-icon{
        color:white;
        margin:18px;
        width: 30px;
        height: 51px;
        border-radius: 98.5px;
    }

`
const Data=styled.h1`font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;

color: #C6C6C6;
`
const Button=styled.button`
        font-family: 'Raleway';
        font-weight: 700;
        width: 155px;
        height: 114px;
        margin: auto;
        text-align: center;
        background-color: #A328D6;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
`
const Column=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    margin-top: 20px;
    margin-bottom: 35px;
`
const Text=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    color: #FFFFFF;
`
const Page=styled.div`
    margin-top:70px;
    margin-bottom:70px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 80px);
    overflow-x: scroll;
`
const Register=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
    width: 90%;
    height: 85%;
    background-color: white;
    border-radius: 5px;
`
const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    justify-content: space-between;
    width: 90%;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    h2{
        text-align: right;
        color: #C70000;
    }
    h3{
        text-align: right;
        color: #03AC00;
    }
`