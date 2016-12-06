var app = angular.module('app', []);


app.controller('appController', function(){
        
        var vm = this;

        vm.taskList = [];
        vm.tasks_p1 = [];
        vm.tasks_p2 = [];
        vm.tasks_p3 = [];
        vm.tasks_p4 = [];
        vm.addTask = function(newTask){
            vm.taskList.push({"name":newTask, "priority":0, "container":vm.taskList});
            vm.newTask = '';
        }

        vm.incrementPriority = function(task){
            if (task.priority >= 4){
                task.priority = 0;
            } else {
                task.priority++;
            }
            vm.sortTask(task);
        }

        vm.decrementPriority = function(task){
            if (task.priority <= 0){
                task.priority = 4;
            } else {
                task.priority--;
            }
            vm.sortTask(task);
        }

        vm.sortTask = function(task){
            //refactor to switch case
            vm.removeTask(task);
            if (task.priority === 0){
                task.container = vm.taskList;
                vm.taskList.push(task);
            } 
            if (task.priority === 1){
                task.container = vm.tasks_p1;
                vm.tasks_p1.push(task);
            }            
            if (task.priority === 2){
                task.container = vm.tasks_p2;
                vm.tasks_p2.push(task);
            }    
            if (task.priority === 3){
                task.container = vm.tasks_p3;
                vm.tasks_p3.push(task);
            }
            if (task.priority === 4){
                task.container = vm.tasks_p4;
                vm.tasks_p4.push(task);
            }
        }

        vm.removeTask = function(task){
            var array = task.container;
            var idx = array.indexOf(task);
            array.splice(idx, 1);
        }
});


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: ".dropzone",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {

        var task = event.relatedTarget,
        quadrant = event.target;

        // update the posiion attributes
        target.setAttribute('data-x', 0);
        target.setAttribute('data-y', 0);
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    //translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

  // enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.01,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var task = event.relatedTarget,
        quadrant = event.target;

    // feedback the possibility of a drop
    quadrant.classList.add('drop-target');
    task.classList.add('can-drop');
  },
  ondragleave: function (event) {
    var task = event.relatedTarget,
        quadrant = event.target;

    // remove the drop feedback style
    quadrant.classList.remove('drop-target');
    task.classList.remove('can-drop');
  },
  ondrop: function (event) {
    var task = event.relatedTarget,
        quadrant = event.target;

        console.log("Dropped");
        quadrant.childNodes[1].appendChild(task);
        task.style.webkitTransform =
        task.style.transform =
        'translate(' + 0 + 'px, ' + 0 + 'px)';

                // update the posiion attributes
        target.setAttribute('data-x', 0);
        target.setAttribute('data-y', 0);

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    var task = event.relatedTarget,
        quadrant = event.target;


    quadrant.classList.remove('drop-active');
    quadrant.classList.remove('drop-target');
  }
});