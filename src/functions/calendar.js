import flatpickr from "flatpickr";
require("flatpickr/dist/flatpickr.min.css");
// require("flatpickr/dist/themes/dark.css");

import {format} from "date-fns";

const setDateToday = document.querySelector("#date-now")
setDateToday.innerText = format(new Date(), 'eeee dd, yyyy')

function formDate(){
    flatpickr('.form-control',{
        enableTime: false,
        dateFormat: "d-m-Y",
        minDate: "today"
    });
}


export{formDate}