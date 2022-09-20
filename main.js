let auth_token;
$(document).ready(function(){

    $.ajax({
        url:'https://www.universal-tutorial.com/api/getaccesstoken',
        type:'GET',
        dataType:'json',
        headers:{
            "Accept":"application/json",
            "api-token":" mRVVlbZjIiI552zwvEWi7kF7eUgwLUqDLqjblb6vz1b4z8VostHs4KcuiJa-Gc3ZKTg",
            "user-email":"shubhamk.aspirefox@gmail.com",
        },
        contentType:'application/json; charset=utf-8',
        success:function(data){
            auth_token=data.auth_token;
            // console.log(auth_token);

            getCountry(data.auth_token);
        },
        error:function(error){
            console.log(error.statusText);
        },
    })
    $('#country').change(function(){
        getState();
    })
    $('#state').change(function(){
        getCity();
    })
})
function getCountry(auth_token){
    $.ajax({
        type:'GET',
        url:'https://www.universal-tutorial.com/api/countries',
        headers:{
            "Authorization":`Bearer ${auth_token}`,
            "Accept":"application/json"
        },
        success:function(data){
            // console.log(data);
            data.forEach(element => {
                // console.log(element.country_name);
                $('#country').append(`<option value=${element.country_name}>${element.country_name}</option>`);
            });
        },
        error:function(error){
            console.log(error);
        }
    });
} 
function getState(){
    let country_name=$('#country').val();
    $.ajax({
        type:'GET',
        url:'https://www.universal-tutorial.com/api/states/'+country_name,
        headers:{
            "Authorization":`Bearer ${auth_token}`,
            "Accept":"application/json"
        },
        success:function(data){
            console.log(data);
            $("#state").empty()
            data.forEach(element => {
            $('#state').append(`<option value=${element.state_name}>${element.state_name}</option>`);
            });
        },
        error:function(error){
            console.log(error);
        }  
    })
}
function getCity(){
    let state_name=$('#state').val();
    $.ajax({
        type:'GET',
        url:'https://www.universal-tutorial.com/api/cities/'+state_name,
        headers:{
            "Authorization":`Bearer ${auth_token}`,
            "Accept":"application/json"
        },
        success:function(data){
            console.log(data);
            $("#city").empty()
            data.forEach(element => {
            $('#city').append(`<option value=${element.city_name}>${element.city_name}</option>`);
            });
        },
        error:function(error){
            console.log(error);
        }  
    })
}
