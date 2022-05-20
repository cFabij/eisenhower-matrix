const dragContainers = document.querySelectorAll(".drag-containers");
let draggables = null;
let draggedParentNode = null;

document.addEventListener("dragstart", (event) => {
  draggedParentNode = event.target.parentNode;
});

dragContainers.forEach((container) => {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);
    const draggable = document.querySelector(".dragging");

    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

dragContainers.forEach((container) => {
  container.addEventListener("drop", (event) => {
    event.preventDefault();
    const draggable = document.querySelector(".dragging");

    if (container.childNodes.length > 5) {
      container.removeChild(draggable);
      draggedParentNode.appendChild(draggable);
      alert("Erstmal was abarbeiten ; )");
    }
  });
});

function getDraggables() {
  draggables = document.querySelectorAll(".draggable");

  dragListeners();
}

function dragListeners() {
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}

function createTask(text) {
  if (text == null || text.trim() === "") {
  } else {
    let node = document.createElement("li");
    node.className = "draggable";

    let attribute = document.createAttribute("draggable");
    attribute.value = "true";

    node.setAttributeNode(attribute);
    let textnode = document.createTextNode(text);

    node.appendChild(textnode);

    return node;
  }
}

function newItemPlan() {
  let text = document.getElementById("task_plan").value;

  let node = createTask(text);

  if (document.getElementById("list_plan").childNodes.length == 5) {
    alert("Erstmal was abarbeiten ; )");
  } else {
    if (node != null) {
      node.parentNode = document.getElementById("list_plan");
      document.getElementById("list_plan").appendChild(node);
    }
  }

  getDraggables();
}

function newItemDo() {
  let text = document.getElementById("task_do").value;

  let node = createTask(text);

  if (document.getElementById("list_do").childNodes.length == 5) {
    alert("Erstmal was abarbeiten ; )");
  } else {
    if (node != null) {
      document.getElementById("list_do").appendChild(node);
    }
  }

  getDraggables();
}

function newItemDelete() {
  let text = document.getElementById("task_delete").value;

  let node = createTask(text);

  if (document.getElementById("list_delete").childNodes.length == 5) {
    alert("Erstmal was abarbeiten ; )");
  } else {
    if (node != null) {
      document.getElementById("list_delete").appendChild(node);
    }
  }

  getDraggables();
}

function newItemDelegate() {
  let text = document.getElementById("task_delegate").value;

  let node = createTask(text);

  if (document.getElementById("list_delegate").childNodes.length == 5) {
    alert("Erstmal was abarbeiten ; )");
  } else {
    if (node != null) {
      document.getElementById("list_delegate").appendChild(node);
    }
  }

  getDraggables();
}

let taskAddPlan = document.getElementById("add_plan");

taskAddPlan.addEventListener("click", newItemPlan);

let taskAddDo = document.getElementById("add_do");

taskAddDo.addEventListener("click", newItemDo);

let taskAddDelete = document.getElementById("add_delete");

taskAddDelete.addEventListener("click", newItemDelete);

let taskAddDelegate = document.getElementById("add_delegate");

taskAddDelegate.addEventListener("click", newItemDelegate);
