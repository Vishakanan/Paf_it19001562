$.getJSON("http://localhost:8080/GadgetBadget/ResearcherService/Researchers", function(data){

        var responseObj = JSON.parse(data);
        appendToProductTable(responseObj);
        $.each(responseObj,function(i,research){
          appendToProductTable(research);
      });

});
function appendToProductTable(research) {
  console.log(JSON.stringify(research))
    
  $("#researchTable > tbody:last-child").append(`
          <tr id="user-${research.researcherId}">
              <td class="productData" name="researcherID">${id}</td>
              '<td class="productData" name="researcherName">${name}</td>
              '<td class="productData" name="researcherPhone">${research.researcherPhone}</td>
              '<td class="productData" name="researcherUniversity">${research.researcherUniversity}</td>
              '<td align="center">
                  <button class="btn btn-success form-control" onClick="editResearch(${research.researcherId})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn btn-danger form-control" onClick="deleteProduct(${research.researcherId})">DELETE</button>
              </td>
          </tr>
      `)
};


function editResearch(id) {
  $.getJSON("http://localhost:8080/GadgetBadget/ResearcherService/Researchers", function(data){
        var responseObj = JSON.parse(JSON.stringify(data));
        responseObj.forEach(function(research, i) {
          if (research.researcherId == id) {
            $(".modal-body").empty().append(`
                      <form id="updateResearch" action="">
                          <label for="researcherName">Researcher Name</label>
                          <input class="form-control" type="text" name="researcherName" value="${research.researcherName}"/>
                          <label for="researcherPhone">Researcher Phone</label>
                          <input class="form-control" type="text" name="researcherPhone" value="${research.researcherPhone}"/>
                          <label for="researcherUniversity">Researcher University</label>
                          <input class="form-control" type="text" name="researcherUniversity" value="${research.researcherUniversity}"/>
            `);
            $(".modal-footer").empty().append(`
                          <button type="button" type="submit" class="btn btn-primary" data-dismiss="modal" onClick="updateResearch(${id})">Save changes</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      </form>
            `);
          }
        });
  });
    
}


function deleteProduct(id) {
  $.ajax({
    type:"DELETE",
    url:"http://localhost:8080/GadgetBadget/ResearcherService/Researchers",
    data:`<itemData><researcherId>${id}</researcherId></itemData>`,
    contentType: 'text/xml',
  });
}

function updateResearch(id) {
  var newResearch = {};
  newResearch.researcherId = id;

  $("#updateResearch").children("input").each(function(){
    newResearch[$(this).attr("name")] = $(this).val();
  })
  console.log(newResearch);

  $.ajax({
    async:true,
    type:"PUT",
    url:"http://localhost:8080/GadgetBadget/ResearcherService/Researchers",
    data:JSON.stringify(newResearch),
    contentType: 'application/json',
    success:function(){
      alert("success")
    }
  });
}



$("form").submit(function(e) {
  e.preventDefault();
});

$("form#addResearch").submit(function() {
  var research = {};
  var reserchName = $('input[name="researcherName"]').val().trim();
  var reserchPhone = $('input[name="researcherPhone"]').val().trim();
  var reserchUniversity = $('input[name="researcherUniversity"]').val().trim();
  if(reserchName && reserchPhone && reserchUniversity){
      $(this).serializeArray().map(function(data) {
          research[data.name] = data.value;
      });

      addProduct(research)
        
  }else{
      alert("You must have filled all fields");
  }
  
});

function addProduct(research){
$.ajax({
  async:true,
  type:"POST",
  url:"http://localhost:8080/GadgetBadget/ResearcherService/Researchers",
  data:JSON.stringify(research),
  contentType: 'application/json',
  success:function(){
    alert("added successfully");
    $('input[name="researcherName"]').val("");
    $('input[name="researcherPhone"]').val("");
    $('input[name="researcherUniversity"]').val("");
  }
});
}