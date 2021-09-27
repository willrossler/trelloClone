//SELECTORS
window.onload=function() {

const todoInput = document.querySelector('#todo');
const todoDescription = document.querySelector('#description');
const deadline = document.querySelector('#deadline');
const saveButton = document.querySelector('#saveButton');
const widgetButton = document.querySelector('#widgetButton');
const widgetList = document.querySelector('#widgetList');
const tabs1 = document.querySelector('#tabs-1');
const tabs2 = document.querySelector('#tabs-2');
const tabs3 = document.querySelector('#tabs-3');
const formID = document.querySelector('#newTodoForm');
const inputs = document.getElementsByTagName('input');



//FUNCTION FOR OPENING MODAL/TAB & SETTING VALUES TO TABS

  function openModal(event){
      $('#tabs').dialog();   
      tabs1.innerText = event.target.getAttribute("data-todo");
      tabs2.innerText = event.target.getAttribute("data-description");
      tabs3.innerText = event.target.getAttribute("data-deadline");
  };



    //EVENTS
saveButton.addEventListener('click', addTodo);
widgetButton.addEventListener('click', widgetFetch);


//FUNCTION FOR TODO LIST
function addTodo(event){
    event.preventDefault();

    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i].value == ""){
        alert("Please fill all fields");
        return false;
      }
      }
    
    // Todo DIV
    const todoDiv = document.querySelector('#sortable1')

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    newTodo.setAttribute("data-description", todoDescription.value);
    newTodo.setAttribute("data-todo", todoInput.value);
    newTodo.setAttribute("data-deadline", deadline.value);
    newTodo.addEventListener('click', openModal);
    todoDiv.appendChild(newTodo);
    

    $('#modal').dialog('close');
    formID.reset();

    
};

function widgetFetch(event) {
  $.ajax({
    url: "https://www.boredapi.com/api/activity",
    contenType: 'application/json',
    error: function(err) {
      console.log('something went wrong', err);
    },
    success: function(result){
      const widgetText = document.createElement('li');
      widgetText.innerText = result.activity;
      widgetList.append(widgetText);
    }
});
}

//JQUERY
$(function() {
    $(document).ready( function(){
      $('#modal').dialog({autoOpen: false, hide: true, show: true});
    });
    
    $( function() {
        $( "#tabs" ).tabs();
      });

    $('#newButton').click(function () {
      $('#modal').dialog('open');

    });
       
    $(function() {
        $("#sortable1, #sortable2, #sortable3" ).sortable({
          connectWith: ".sortableCol"
        })
      });
    
      $(function() {
        $(".datepicker").datepicker({ 
            dateFormat: "yy-mm-dd", 
            onSelect: function(){
                var selectedDate = $(this).val();
                console.log(selectedDate);
            }
        });
      

      $( function() {
        $( '#title' ).colorMyStuff();
      });
    });

// Mandatory UI Widget

  


$.fn.colorMyStuff = function() {
  let settings = $.extend({
    fontSize : '50px',
  }, );

  return this.css({
    'font-size': settings.fontSize,
    'text-decoration': settings.textdecoration
  });
}
});
};