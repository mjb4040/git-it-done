var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    fetch(apiUrl).then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    });
  };
  
  var displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    
    // loop over repos
    for(var i = 0; i < repos.length; i++) {
      var repoName = repos[i].owner.login + "/" + repos[i].name;
      // container for each repo
      var repoEl = document.createElement("div");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      //create span element 
      var titleEl = document.createElement("span");
      titleEl.textContent = repoName;

      //creat status element 
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-roe align-center";
      // check if current repo has issues 
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML = 
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
       } else {
          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
     
      // append container
      repoEl.appendChild(titleEl);
      repoEl.appendChild(statusEl);
      //append container to DM 
      repoContainerEl.appendChild(repoEl);
    }
  };

  var userFormEl = document.querySelector("#user-form");
  var nameInputEl = document.querySelector("#username");

  var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
      getUserRepos(username);
      nameInputEl.value=" ";
    } else {
      alert("Please enter a GitHub username");
    }
  };
  
  userFormEl.addEventListener("submit", formSubmitHandler);

