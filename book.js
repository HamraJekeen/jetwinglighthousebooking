
//variable available to rooms booking
const singleRoomPrice=25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;
const childmeals = 5000;
const bedprice = 8000;

let roomCost;
let loyalpoint = 0;


// reference to interactive elements to rooms booking
const fullName = document.getElementById("name");
const contact = document.getElementById("telephone");
const mail = document.getElementById("email");
const singleRequirement = document.getElementsByName("extra");
const txtAdult = document.getElementById("adultroom")
const txtSingle = document.getElementById("noofroomsingle");
const txtCheckIn = document.getElementById("checkin");
const txtCheckOut = document.getElementById("checkout");
const txtDouble = document.getElementById("noofroomdouble");
const txtTriple = document.getElementById("noofroomtriple");
const txtBed = document.getElementById("bedextra");
const txtChildren = document.getElementById("childroom")
const txtroomCost = document.getElementById("currentcost")
const btnRoom = document.getElementById("bookroom");
const btnLoyalPoints = document.getElementById("loyal");
const txtPromo = document.getElementById("promocode");
const roomElement = document.getElementById("roomsBooking");

const elementRoomInput = document.querySelectorAll("#roomsBooking input");

// to prevent user from selecting previous dates 
txtCheckIn.min = new Date().toISOString().split("T")[0];
txtCheckOut.min = new Date().toISOString().split("T")[0];

//
txtCheckIn.addEventListener('change', function() {
    // Update the min attribute of check-out date based on check-in date
    txtCheckOut.min = txtCheckIn.value;
    
    // Calculate the next day
    const nextDay = new Date(txtCheckIn.value);
    nextDay.setDate(nextDay.getDate() + 1);

    // Set check-out date to one day after check-in date
    txtCheckOut.valueAsDate = nextDay;
  });


// declaration for table

function updateOverallBookingDetails() {
    // Update the table with the booking details
    document.getElementById("nametable").textContent = fullName.value;
    document.getElementById("singletable").textContent = txtSingle.value    ;
    document.getElementById("doubletable").textContent = txtDouble.value;
    document.getElementById("tripleTable").textContent = txtTriple.value;

    // Calculate total rooms
    let totalRooms = parseInt(txtSingle.value) + parseInt(txtDouble.value) + parseInt(txtTriple.value);
    document.getElementById("totalroomtable").textContent = totalRooms;
    let totalDays = (new Date(txtCheckOut.value) - new Date(txtCheckIn.value)) / (24 * 60 * 60 * 1000);
    document.getElementById("totaldaystable").textContent = totalDays;
    

   

    // Update the cost table
    document.getElementById("costtable").textContent = roomCost+" LKR";

    

   

    

   
   

    // Display the table
    
}


btnLoyalPoints.addEventListener("click", displayLoyal);
// function for loyalty points
function displayLoyal(evt) {
    evt.preventDefault();
    
    //to save the loyalty points when the button is clicked
    saveLoyaltyPointsToLocal(loyalpoint);

    alert(`Loyalty Points obtained is ${loyalpoint}`);
}

// Function to save loyalty points to local storage
function saveLoyaltyPointsToLocal(points) {
    localStorage.setItem('loyaltyPoints', points.toString());
}

 
  



function calculateRoomCost(){

    
    let totalSingle = parseInt(txtSingle.value);
  
    let totalDouble = parseInt(txtDouble.value);

    let totalTriple = parseInt(txtTriple.value);

    let extraBeds = parseInt(txtBed.value);

    let MealPrice = parseInt(txtChildren.value);

    let numAdult = parseInt(txtAdult.value);

   
    
    let singleRoomCost = totalSingle  * singleRoomPrice;

    let doubleRoomCost = totalDouble *  doubleRoomPrice;

    let tripleRoomCost = totalTriple *  tripleRoomPrice;

    let childrenFood = MealPrice * childmeals;

    let moreExtraBeds = extraBeds * bedprice;

    let totalDays = (new Date(txtCheckOut.value) - new Date(txtCheckIn.value)) / (24 * 60 * 60 * 1000);
    

   

    roomCost = ((singleRoomCost+doubleRoomCost+tripleRoomCost)*totalDays)+(childrenFood)+(moreExtraBeds);

    let totalRooms = totalSingle + totalDouble + totalTriple;

   
    if (totalRooms > 3) {
        loyalpoint = totalRooms * 20;
    }

    



}



 
elementRoomInput.forEach(input => input.addEventListener('input', updateCurrentRoomBooking));

function updateCurrentRoomBooking(){
    calculateRoomCost();
    if(txtPromo.value==="Promo123"){
        roomCost = (roomCost*0.95);
    
    }

    txtroomCost.innerHTML=`
    <h3>Current Booking</h3>
    <p>Name: ${fullName.value}</p>
    <p>No Of Single Rooms: ${txtSingle.value}</p>
    <p>No Of Double Rooms: ${txtDouble.value}</p>
    <p>No Of Triple Rooms: ${txtTriple.value}</p>
    <p>Room Cost: ${roomCost}</p>

    `


}

singleRequirement.forEach(checkbox=>checkbox.addEventListener('change', updateCurrentRoomBooking));

function gettingExtraRequirements(){
    const requirements = [];
    singleRequirement.forEach(checkbox => {if(checkbox.checked){
        requirements.push(checkbox.id);
    }})
    return requirements.join(',');
}
function validateRoomInputs() {
    if (!(fullName.value && contact.value && mail.value && txtCheckIn.value && txtCheckOut.value)) {
        alert("Please fill out all the required fields");
    }
    
    
    
    else if(!(parseInt(txtSingle.value) || parseInt(txtDouble.value) || parseInt(txtTriple.value))) {
        alert("Select at least one type of room to book.");
    } 
    else if(parseInt(txtSingle.value)>10 || parseInt(txtDouble.value)>10 || parseInt(txtTriple.value)>10) {
        alert("Please make sure to have at maximum number of rooms is 10");
    } 
    else if (parseInt(txtAdult.value) > 100 || parseInt(txtChildren.value) > 100) {
        alert("Please make sure to have at maximum number of adults and kids is 100");
    }
    
    
    else if (parseInt(txtAdult.value) < 1) {
        alert("Please make sure to have at least one adult for your booking");
    }
   
    
    else{
        
        // Calculate the room cost and update the current room booking
        calculateRoomCost();
        updateCurrentRoomBooking();
            
        // Update the overall booking details
        updateOverallBookingDetails();
               
    
            // Clear the form
        roomElement.reset();
    
        txtroomCost.innerHTML = '';
        alert(`Your booking successfully done,
        \t Thank You For Booking With us! `);
    }


}










btnRoom.addEventListener("click", updateoverAllRoomTable);

function updateoverAllRoomTable(event) {
    // Prevent the form from submitting and page reloading
    event.preventDefault();
    

   
  

    // Check if the form is valid
    if (roomElement.checkValidity()) {
        
        validateRoomInputs();
        
    

       

        

        

    }
}


























//adventure booking

//variable available to rooms booking
const divingLocalAdults = 5000;
const divingLocalchild = 2000;
const divingForiegnAdults = 10000;
const divingForiegnchild = 5000;
const divingGuideAdult = 1000;
const divingGuideChild = 500;

let guideCost = 0;

let AdventureCost;
let guideAdult="No";
let guideChild="No";



// reference to interactive elements to rooms booking
const fullNameadventure = document.getElementById("nameadventure");
const contactAdventure = document.getElementById("telephoneadventure");
const optgames=document.getElementById("games");
const txtAdultLocal = document.getElementById("adultcount");
const txtChildLocal = document.getElementById("childcount");
const txtTimeLocal = document.getElementById("Timeperiod");
const txtAdultForiegn = document.getElementById("adultcountforiegn");
const txtChildForiegn =document.getElementById("childcountforiegn");
const txtTimeForiegn = document.getElementById("Timeperiodforiegn");
const tourguide = document.getElementsByName("guide");
const btnadventure = document.getElementById("bookadventure");
const txtAdventureCost = document.getElementById("currentcostdiving");
const advenElement = document.getElementById("adventurebooking");

const elementadvenInput = document.querySelectorAll("#adventurebooking input");

const btnFavourite = document.getElementById("Favourite");
const btnCheckFavourite = document.getElementById("checkfavourite");


//function for adventure cost calculation

function calculateAdventureCost(){
    let localAdult = parseInt(txtAdultLocal.value);

    let localKids = parseInt(txtChildLocal.value);

    let foriegnAdult =parseInt(txtAdultForiegn.value);

    let foriegnKids = parseInt(txtChildForiegn.value);

    let timeDuration = parseInt(txtTimeLocal.value);

    let timeDurationForiegn = parseInt(txtTimeForiegn.value);

    let LocalCost = ((localAdult * divingLocalAdults) + (localKids * divingLocalchild)) * timeDuration;

    let foriegnCost = ((foriegnAdult * divingForiegnAdults) + (foriegnKids * divingForiegnchild)) * timeDurationForiegn;

    AdventureCost = LocalCost + foriegnCost;


}
elementadvenInput.forEach(input => input.addEventListener('input',updateCurrentAdvenBooking));

function updateCurrentAdvenBooking(){
    calculateAdventureCost();
   



// current booking adventure cost without tourguide
    txtAdventureCost.innerHTML = `
    <h3>Current Adventure Booking </h3>
    <p>Name: ${fullNameadventure.value}</p>
    <p>No of resident Kids: ${txtChildLocal.value}</p>
    <p>No of resident Adults: ${txtAdultLocal.value}</p>
    <p>No of non-resident Adults: ${txtAdultForiegn.value}</p>
    <p>No of non-resident Kids: ${txtChildForiegn.value}</p>
    <p>Total Cost: ${AdventureCost} LKR</p>`
    

    

    
}
//function for tourguide check boxes
tourguide.forEach(checkbox=>checkbox.addEventListener('change', gettingTourGuide));

// calculations to calculate the total adventure cost
function gettingTourGuide(){


    let localAdult = parseInt(txtAdultLocal.value);

    let localKids = parseInt(txtChildLocal.value);

    let foriegnAdult =parseInt(txtAdultForiegn.value);

    let foriegnKids = parseInt(txtChildForiegn.value);

    let totalAdult = localAdult+foriegnAdult;

    let totalKids = localKids + foriegnKids;

    

    if(this.value =="guideadult"){
        if(this.checked){
            
            guideCost+=divingGuideAdult * totalAdult ;
            guideAdult = "Yes";

            
        }
        else{
            guideCost-=divingGuideAdult * totalAdult;
            guideAdult = "No";
           
        }
       
    }
    if(this.value=="guidechild"){
        if(this.checked){
            
            guideCost+=divingGuideChild * totalKids;
            guideChild = "Yes";
            
        }
        else{
            guideCost-=divingGuideChild * totalKids;
            guideChild = "No";
            
        }
    }
// current booking of adventure booking

    AdventureCost= AdventureCost + guideCost;
    txtAdventureCost.innerHTML = `
    <h3>Current Adventure Booking </h3>
    <p>Name: ${fullNameadventure.value}</p>
    <p>No of resident Kids: ${txtChildLocal.value}</p>
    <p>No of resident Adults: ${txtAdultLocal.value}</p>
    <p>No of non-resident Adults: ${txtAdultForiegn.value}</p>
    <p>No of non-resident Kids: ${txtChildForiegn.value}</p>
    <p>Cost for Tour guide: ${guideCost}</p>
    

    <p>Total Cost: ${AdventureCost} LKR</p>`
   
    
}


function validateAdventureInputs() {
    if(!((fullNameadventure.value)+(contactAdventure.value))){
        alert(`please fill out the required fields`);

    }
   
    else if(!(parseInt(txtAdultLocal.value) || parseInt(txtChildLocal.value) || parseInt(txtAdultForiegn.value)|| parseInt(txtChildForiegn.value))) {
        alert("please fill out one of the adult or children field in the resident or non-resident booking.");
    } 
    else if(parseInt(txtAdultLocal.value)>20 || parseInt(txtAdultForiegn.value)>20 || parseInt(txtChildLocal.value)>20|| parseInt(txtChildForiegn.value)>20) {
        alert("Please make sure to have at maximum number of kids and adults is 20");
    } 
    else if ((parseInt(txtTimeForiegn.value)|| parseInt(txtTimeLocal.value))< 1) {
        alert("please fill out one of the required time period field in the resident or non-resident booking.");
    }
    else if ((parseInt(txtTimeForiegn.value)>5 || parseInt(txtTimeLocal.value))>5) {
        alert("Please make sure to have a maximum time period of 5 hours.");
    }
    
    
    else{
        calculateAdventureCost();
        gettingTourGuide();
        updateCurrentAdvenBooking();

        overallAdventurePopout();

        //clear the adventure form

        advenElement.reset();
        txtAdventureCost.innerHTML = '';

        // Clear the room form
        roomElement.reset();

        txtroomCost.innerHTML = '';

        // clearing the table with the booking details
    document.getElementById("nametable").textContent = '';
    document.getElementById("singletable").textContent = ''    ;
    document.getElementById("doubletable").textContent = '';
    document.getElementById("tripleTable").textContent = '';

    // clearing Calculate total rooms and total days
   
    document.getElementById("totalroomtable").textContent = '';
    document.getElementById("totaldaystable").textContent = '';

   

    // clearing the cost table
    document.getElementById("costtable").textContent = '';
        

        
   
    }


}
//adventure button functions
btnadventure.addEventListener("click",updateOverallAdvenBooking);

function updateOverallAdvenBooking(evtad){

    evtad.preventDefault();

    if(advenElement.checkValidity()){
        validateAdventureInputs();
        
    }

    


}
//overall adventure booking details as alert messsage

function overallAdventurePopout(){
    let totalhours = parseInt(txtTimeForiegn.value) + parseInt(txtTimeLocal.value);


    alert(`Hello ${fullNameadventure.value},\n
    \tThank you for Booking with us
    Your adventure Booking details are:
    \tAdventure name: ${optgames.value}
    \tTotal booking hours: ${totalhours}
    \tGuide Needed For Adult: ${guideAdult}
    \tGuide Needed For Child: ${guideChild}
    Total Adventure cost: ${AdventureCost+=guideCost} LKR



    `);

}

//local storage process

btnFavourite.addEventListener("click",addFavourite);
//storing information to local storage

function addFavourite(){
    const favouriteInfo = {
        fullName:fullName.value,
        contact:contact.value,
        mail:mail.value,
        singleRequirement:singleRequirement.checked,
        txtAdult:txtAdult.value,
        txtSingle:txtSingle.value,
        txtCheckIn:txtCheckIn.value,
        txtCheckOut:txtCheckOut.value,
        txtDouble:txtDouble.value,
        txtTriple:txtTriple.value,
        txtBed:txtBed.value,
        txtChildren:txtChildren.value,
        txtroomCost:txtroomCost.value,
        fullNameadventure:fullNameadventure.value,
        contactAdventure:contactAdventure.value,
        optgames:optgames.value,
        txtAdultLocal:txtAdultLocal.value,
        txtChildLocal:txtChildLocal.value,
        txtTimeLocal:txtTimeLocal.value,
        txtAdultForiegn:txtAdultForiegn.value,
        txtChildForiegn:txtChildForiegn.value,
        txtTimeForiegn:txtTimeForiegn.value,
        tourguide:tourguide.checked,
        
        txtPromo:txtPromo.value



    };
    localStorage.setItem('favouriteInfo', JSON.stringify(favouriteInfo));
  alert('Form information saved as favorite!');



}

//retrieving information from local storage
btnCheckFavourite.addEventListener("click",checkFavourite);
 function checkFavourite(){
    const favouriteData = JSON.parse(localStorage.getItem('favouriteInfo'));

    

    if(favouriteData){
        fullName.value=favouriteData.fullName;
        contact.value=favouriteData.contact;
        mail.value=favouriteData.mail;
        singleRequirement.checked=favouriteData.singleRequirement;
        txtAdult.value=favouriteData.txtAdult;
        txtSingle.value=favouriteData.txtSingle;
        txtCheckIn.value=favouriteData.txtCheckIn;
        txtCheckOut.value=favouriteData.txtCheckOut;
        txtDouble.value=favouriteData.txtDouble;
        txtTriple.value=favouriteData.txtTriple;
        txtBed.value=favouriteData.txtBed;
        txtChildren.value=favouriteData.txtChildren;
        txtroomCost.value=favouriteData.txtroomCost;
        fullNameadventure.value=favouriteData.fullNameadventure;
        contactAdventure.value=favouriteData.contactAdventure;
        optgames.value=favouriteData.optgames;
        txtAdultLocal.value=favouriteData.txtAdultLocal;
        txtChildLocal.value=favouriteData.txtChildLocal;
        txtTimeLocal.value=favouriteData.txtTimeLocal;
        txtAdultForiegn.value=favouriteData.txtAdultForiegn;
        txtChildForiegn.value=favouriteData.txtChildForiegn;
        txtTimeForiegn.value=favouriteData.txtTimeForiegn;
        tourguide.checked=favouriteData.tourguide;
        txtPromo.value=favouriteData.txtPromo;

    }
    alert('Stored information is retrieved from favourites!');
 }





























