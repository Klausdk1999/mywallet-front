import React from "react";
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from "../context/UserContext";

export default function Header(){
    const { user } = useContext(UserContext);
   
    const {image,name} = user;

    return(
        <Container>
            <h1>Olá, user{name}</h1>     
            <ion-icon name="log-out-outline"></ion-icon>
        </Container>
    )
}

const Container=styled.div`
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