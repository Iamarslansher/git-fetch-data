var userName = "";
var userAvatar = "";
var userBio = "";
var userFollowers = "";
var userFollowing = "";
var userRepos = "";
var userGithubLink = "";
var userGitLocation = "";

function userInputText() {
  var userInput = document.getElementById("inputField");
  var userInputValue = userInput.value;

  if (userInputValue == "") {
    alert("Please input username");
    return;
  }

  userApiData(userInputValue);

  userInput.value = "";
}

function userApiData(userInputName) {
  fetch(`https://api.github.com/users/${userInputName}`)
    .then((response) => {
      if (!response.ok) {
        throw Error("RECORD NOT FOUNF");
      }
      return response.json();
    })
    .then(function (jSonResponse) {
      console.log(jSonResponse);
      userName = jSonResponse.name;
      userBio = jSonResponse.bio;
      userAvatar = jSonResponse.avatar_url;
      userFollowers = jSonResponse.followers;
      userFollowing = jSonResponse.following;
      userRepos = jSonResponse.public_repos;
      userGithubLink = jSonResponse.html_url;
      userGitLocation = jSonResponse.location;

      Swal.fire({
        title: "SUCCESS!",
        text: "RECORD FOUND!",
        icon: "success",
      });

      printUserData();
    })
    .catch((error) => {
      userName = "Invalid Username ";
      userBio = "No Data";
      userAvatar = "./assets/images/img-place.jpeg";
      userFollowers = "00";
      userFollowing = "00";
      userRepos = "00";
      userGitLocation = "No Data";
      userGithubLink = "";
      Swal.fire({
        title: "ERROE!",
        text: "RECORD NOT FOUND!",
        icon: "error",
      });
      printUserData();
    });
}

function printUserData() {
  var userImage = document.getElementById("userAvatar");
  var userGitName = document.getElementById("userGitName");
  var usreGitBio = document.getElementById("userBio");
  var userGitFollowers = document.getElementById("userFollowers");
  var userGitFollowing = document.getElementById("userFollowing");
  var userGitRepos = document.getElementById("userRepos");
  var userGitLink = document.getElementById("userGitLink");
  var userLocation = document.getElementById("userLocation");

  userGitName.innerHTML = userName;
  usreGitBio.innerHTML = userBio;
  userImage.src = userAvatar;
  userGitFollowers.innerHTML = userFollowers;
  userGitFollowing.innerHTML = userFollowing;
  userGitRepos.innerHTML = userRepos;
  userGitLink.href = userGithubLink;
  userLocation.innerHTML = userGitLocation;
}
