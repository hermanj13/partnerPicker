let students
const partners = [];
let present = 0
let flag = false

$(document).ready(function() {
  (function onLoad() {
    $.ajax({
        url: '/attendance/retrieve',
        method: "GET"
      })
      // After the data comes back from the API
      .done(function(response) {
        students = response
        students.forEach(function(student){
          if(student.present){
            present++
          }
        })
        setTimeout(function(){
          $(".loader").hide()
          pickUser();
        },300)
      })
  })()

  const print = function() {
    let i
    let html
    let extra
    if(partners.length > 1){
      if (flag === true) {
        students.forEach(function(student){
          if(student.present === true && student.partnered === false){
            extra = student.name
          }
        })
        html = `<table class="table table-striped table-hover table-dark"><thead><tr><th class="number" scope="col">Group #</th><th scope="col">Player One</th><th scope="col">Player Two</th><th scope="col">Player Three</th></tr></thead><tbody>`;
        let group = 1;
        for (i = 0; i < partners.length - 1; i++) {
          html += `<tr><th class="number" >` + group + `</th><td>` + partners[i].playerOne + `</td><td>` + partners[i].playerTwo + `</td><td></td></tr>`;
          group++;
        };
        html += `<tr><th class="number" >` + group + `</th><td>` + partners[i].playerOne + `</td><td>` + partners[i].playerTwo + `</td><td>` + extra + `</td></tr>`;
        html += `</tbody></table>`;
      } else {
        html = `<table class="table table-striped table-hover table-dark"><thead><tr><th class="number" scope="col">Group #</th><th scope="col">Player One</th><th scope="col">Player Two</th></tr></thead><tbody>`;
        let group = 1;
        for (i = 0; i < partners.length; i++) {
          html += `<tr><th class="number" scope="row">` + group + `</th><td>` + partners[i].playerOne + `</td><td>` + partners[i].playerTwo + `</td></tr>`;
          group++;
        };
        html += `</tbody></table>`;
      }
    }else{
      html = "<h3>You need atleast four students to randomize partners!</h3>"
    }
    document.querySelector("#picker").innerHTML = html;
  }

  const pickUser = function(currentMax) {
    let i;
    let group = 0;
    let index;
    let random;
    let neededGroups = present % 2 === 0 ? present/2 : Math.floor(present/2)
    flag = present % 2 === 0 ? false : true

    while (group < neededGroups) {
      random = Math.floor(Math.random() * students.length);
      while (students[random].partnered === true || students[random].present === false) {
        random = Math.floor(Math.random() * students.length);
      };
      students[random].partnered = true;
      index = Math.floor(Math.random() * students.length);
      while (students[index].partnered === true || students[index].present === false) {
        index = Math.floor(Math.random() * students.length);
      };
      students[index].partnered = true;
      partners[group] = {
        "playerOne": students[random].name,
        "playerTwo": students[index].name
      };
      group++;
    }
    console.log(partners)
    print();
  };
});
