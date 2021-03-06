"use strict";

function setup() {
  console.log("running");
  const text = select("#content").html();
  const exportButton = select("#export");
  const importButton = select("#import");
  const saveButton = select("#save");
  const deleteButton = select("#deleteFile");
  importButton.mousePressed(loadData);
  exportButton.mousePressed(saveData);
  saveButton.mousePressed(loadFileNames);
  deleteButton.mousePressed(deleteFile);
}

async function saveData() {
  const fileName = select(".fileName").value();
  const text = select("#content").html();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, fileName }),
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);
  console.log(fileName);
  loadFileNames();
}

async function deleteFile() {
  const fileName = select(".fileName").value();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName }),
  };
  const response = await fetch("/api_2", options);
  const json = await response.json();
  loadFileNames();
}

async function loadFileNames() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  };
  const response = await fetch("/fileNames", options);
  const json = await response.json();
  console.log(json);
  document.querySelector(".fileList").innerHTML = `<li>${json.join(
    "</li ><li>"
  )}</li>`;
}
async function loadData() {
  const fileName = select(".fileName").value();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  };
  fetch(`website/js/json/${fileName}.json`, options)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".content").innerHTML = ` ${data.text}`;
    });
  loadFileNames();
}
