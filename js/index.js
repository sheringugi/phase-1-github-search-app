//HTML elements 
const searchForm = document.querySelector('#github-form'); 
const searchlnput = document.querySelector('#search'); 
const resultsContainer = document.querySelector('#github-container');
const repos= document.querySelector('#repos-list')
const users= document.querySelector('#user-list')
// GitHub API endpoints and custom headers 
const userSearchEndpoint = 'https://api.github.com/search/users?q='; 
const userReposEndpoint = 'https://api.github.com/users/'; 
const customHeaders = { headers: { Accept: 'application/vnd.github.v3+json' 
}
}; 

// Functions for fetching data from endpoints 
async function searchUsers(username){ 
const response = await fetch(`${userSearchEndpoint} ${username}`, customHeaders);
const data = await response.json(); 
return data.items; 
}
async function getUserRepos(username){
    const response = await fetch(`${userReposEndpoint} ${username}/repos`, customHeaders); 
    const data = await response.json(); 
    return data;
}


// Function for displaying search results 
function displayResults(results) { 
// Clear previous search results 
    users.innerHTML = ""; 
// Display each user in the search results 
    results.forEach(result => { 
    // Create HTML elements to display user information 
    const resultItem = document.querySelector('div'); 
    resultItem.classList.add('result-item');
    const avatarImg = document.createElement('img'); 
    avatarImg.src = result.avatar_url; avatarImg.alt =`${result.login}'s avatar`;
    const usernameLink = document.createElement('a'); 
    usernameLink.href = result.html_url; 
    usernameLink.textContent = result.login; 
// Add event listener to display user's repositories when clicked 
usernameLink.addEventListener('click', async () => { 
const repos = await getUserRepos(result.login); 
displayRepos(repos);
}); 
// Add elements to result item container 
resultItem.appendChild(avatarImg); 
resultItem.appendChild(usernameLink); 
users.appendChild(resultItem); 
});
} 
// Function for displaying user's repositories 
function displayRepos(repos) { 
    // Clear previous repositories 
    resultsContainer.innerHTML = ""; 
// Display each repository 
repos.forEach(repo => { 
    // Create HTML elements to display repository information 
    const repoItem = document.createElement('div'); 
    repoItem.classList.add('repo-item');
    const repoNameLink = document.createElement('a'); 
    repoNameLink.href = repo.html_url; 
    repoNameLink.textContent= repo.name; 
// Add elements to repository item container 
repos.appendChild(repoItem); 
});
} 

// Event listener for search form submission 
searchForm.addEventListener('submit', async event => { 
    console.log("submit hit")
    event.preventDefault(); 
    // Get input value 
    const searchValue = searchlnput.value;
    //Search Github for users matching input value
    const results= await searchUsers(searchValue);

    //Display search results
    displayResults(results);
});


  
// //  document.addEventListener('DOMContentLoaded', ()=> { 
 
// //     const form=document.querySelector('#github-form'); 
     
// //     form.addEventListener('submit',(event)=>{ 
// //     event.preventDefault(); 
// //     const searchInput =grabInput(event); 
// //     form.reset(); 
     
// //     searchUser(searchInput) 
     
// //     }) 
// //     }) 
     
// //      function grabInput(event){ 
// //     return event.target['search'].value 
// //     } 
     
// //     function searchUser(userName){ 
// //     fetch(`https://api.github.com/search/users?q=${userName}`, { 
// //     method: 'GET', 
// //     headers:{ 
// //     Accept:'application/vnd.github.v3+json' 
// //     } 
// //     }) 
// //     .then((response)=>response.json()) 
// //     .then((result) =>{ 
// //     const ul = document.querySelector('#user-list') 
// //     console.log(result) 
     
// //     for (user of result.items){ 
// //     console.log(user)  
// //     const li = document.createElement('li'); 
// //     li.textContent =`Username:${user.login}${user.url}`; 
// //     console.log(li) 
// //     ul.appendChild(li); 
// //     } 
// //     }) 
// //     } 
// // // document.addEventListener("DOMContentLoaded", ()=> {

// // const form = document.querySelector("#github-form")
// // const input = document.querySelector("#search")
// // const result = document.querySelector("#github-container")
// // form.addEventListener("submit", (e) => {
// //     e.preventDefault()
// //     const searchInput = input.value.trim();
// //     if (!searchInput) return;
    
// //     fetch(`https://api.github.com/search/users?q=${searchInput}`, {
// //         method: "GET",
// //         "headers": {
// //             Accept:"application/vnd.github.v3+json"
// //         }
// //     })

// //    .then(res=> res.json())
// //     .then(data => displayUsers(data.items))
// //     .catch (error=> console.log(error.message))
// // });

// //     function displayUsers(users) {
// //         result.innerHTML= "";
// //         users.forEach(user =>{
// //             const userElement= document.createElement("div")
// //             userElement.classList.add('user');
// //             userElement.innerHTML= `
// //             <img src= "${user.avatar_url}" alt ="${user.login} avatar">
// //             <h3>${user.login}</h3>
// //             <a href="${user.html_url}" target="_blank">Profile</a>
// //             `;
// //             userElement.addEventListener("click", ()=>{
// //                 fetch(`https://api.github.com/search/users?q=${user.login}/repos`, {
// //                     method: "GET",
// //                     "headers": {
// //                         Accept:"application/vnd.github.v3+json"
// //                     }
// //                 })
// //                 .then(res=> res.json())
// //                 .then(data => displayRepos(data))
// //                 .catch (error=> console.log(error.message));
            
// //             });
// //             result.appendChild(userElement);

// //         });
// //     }
// //     function displayRepos(repos){
// //         result.innerHTML="";
// //         repos.forEach(repo=>{
// //             const repoElement= document.createElement('div');
// //             repoElement.classList.add('repo');
// //             repoElement.innerHTML= `
// //             <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a>
// //             </h3>
// //             <p>${repo.description ?repo.description: ''}</p>
// //             <p>Language:${repo.language ?repo.language: 'Unknown'}</p>
// //             `;
// //             result.appendChild(repoElement);
// //         });
// //     }
// // })

// //         const ul= document.querySelector("#user-list")
        
// //         for(user of result.items){
// //             const li= document.createElement("li")
// //             li.textContent= `UserName: ${user.login} ${user.url}`
// //             ul.appendChild(li)
// //         }
// //         })


// // function searchRepo(userRepo){
// //     fetch(`https://api.github.com/search/users?q=${userName}/${userRepo}`, {
// //         method: "GET",
// //         headers: {
// //             Accept:"application/vnd.github.v3+json"
// //         }
// //     })

// //    .then(res=> res.json())
// //     .then((outcome) => {
// //         const ul= document.querySelector("#repo-list")
        
// //         for(user of outcome.items){
// //             const div= document.createElement("div")
// //             div.textContent= `UserName: ${user.login} ${user.url}, userRepo`
// //             body.appendChild(div)
// //         }
// //         })



// // }


     
// // });

// // // Here are the general steps you can follow to build this JavaScript application:

// // // Get the value of the input field when the form is submitted.

// // // Use the value to construct a URL for the User Search Endpoint.

// // // Use the fetch() method to make a GET request to the constructed URL, including the custom header Accept: application/vnd.github.v3+json.

// // // Parse the response JSON data to get the information about the users matching the search query.

// // // Display the information about the users on the page, such as their username, avatar, and a link to their profile.

// // // Add a click event listener to the displayed user information, which will trigger a function that makes a GET request to the User Repos Endpoint for that user.

// // // Parse the response JSON data to get the information about the repositories for the selected user.

// // // Display the information about the repositories on the page.

// // // Remember to consider the rate limits for both endpoints when designing your application.

// // // I hope this helps you get started on your project. Good luck!


