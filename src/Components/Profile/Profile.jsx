import React from "react";
import Style from"./Profile.module.css";
import jwtDecode from "jwt-decode";

export default function Profile(){
    
    let encodedToken=localStorage.getItem('userToken');
    let decodedToken=jwtDecode(encodedToken);
    
    return<>
    <h1>Hello : {decodedToken.name}</h1>
    
    </>
}