import {React,useEffect,useState,useContext} from "react";
import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";
import dayjs from "dayjs";
import locale from  "dayjs/locale/pt-br";
import axios from "axios";
import TodayHabit from "./TodayHabit";
import UserContext from "../context/UserContext";

export default function Today(){
  
    const [habits,setHabits]=useState([]);
    
    const { user , setUser} = useContext(UserContext);
    
    const {image,token} = user;
 
    const now = dayjs().locale("pt-br");

    function loadHabits(){
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,config);
    
        promise.then(resposta => {
            nDone=0;
            for(let i=0;i<resposta.data.length;i++){
                if(resposta.data[i].done){
                    nDone++;
                }
            }
            setUser(
                {   
                    image: user.image,
                    token: user.token,
                    percentage: (nDone/resposta.data.length)*100
                },
            );
            setHabits(resposta.data);
        });
        
    }
    let nDone=0;
    let txtcolor="#BABABA";
    let percent;
    let txt=countDone();
    
    function countDone(){
        
        for(let i=0;i<habits.length;i++){
            if(habits[i].done){
                nDone++;
            }
        }
        if(nDone===0){
            return "Nenhum hábito concluído ainda";
        }else{
            txtcolor="#8FC549";
            return `${(nDone/habits.length*100).toFixed(0)}% dos hábitos concluídos`;
        }
    }

    useEffect(() => {
        loadHabits();
        
    }, []);

    const day = now.format("dddd");
    const Day = day.charAt(0).toUpperCase() + day.slice(1);

    return(
        <>
        <Header/>
        <Page>
            <Register></Register>
            <Container>
            <Button>
                <Column>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <Text>Nova entrada</Text>
                </Column>
            </Button>
            <Button>
                <Column>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <Text>Nova saída</Text>
                </Column>
            </Button>
            </Container>
        </Page>
        </>
    )
    // return(
    //     <>
    //     <Header/>
    //     <Page>
    //         <Container> <h1>{Day}, {now.format("DD/MM/YYYY")} </h1> </Container>
    //         <Container> <Text color={txtcolor}>{txt}</Text> </Container>
    //         <Column>
    //             {habits.map((habit) => (
    //                 <TodayHabit loadHabits={loadHabits} habit={habit} token={token} key={habit.id}/>
    //             ))}
    //         </Column>
    //     </Page>
    //     <Footer percent={percent}/>
    //     </>
    // )
}
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
    height: calc(100vh - 140px);
    overflow-x: scroll;
`
const Register=styled.div`
    margin-top: 80px;
    width: 90%;
    height: 60%;
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
    font-family: 'Lexend Deca', sans-serif;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }
`