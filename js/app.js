let body = document.body;
//loader set time out
setTimeout(function () {
  document.querySelector(".loaderContainer").style.cssText = "display:none;";
}, 5000);
//creating a class for fetch
class BOOKSTORE {
  constructor(api) {
    this.api = api;
  }
  //fetch function using async await
  fetchApi(appendto) {
    const data = async () => {
      const got = await fetch(`${this.api}`);
      let response = await got.json();
      let info = response.items;
      info.forEach((element) => {
        //creating book info containers
        let bookContainer = document.createElement("div");
        bookContainer.setAttribute("class", "bookContainer ");
        bookContainer.innerHTML = `<img src="${element.volumeInfo.imageLinks.smallThumbnail}" alt="">
        <p>${element.volumeInfo.authors}</p>
        <a  href="">${element.volumeInfo.title}</a>
        </a>`;
        //creating more elements
        let moreBtn = document.createElement("button");
        moreBtn.innerText = "click for more";
        moreBtn.style.cssText = "height:30px";
        appendto.append(bookContainer);
        bookContainer.append(moreBtn);
        //creating a div that expands to show more info & functions
        moreBtn.addEventListener("click", function () {
          let expandeBookContainer = document.createElement("div");
          expandeBookContainer.classList.remove("none");
          expandeBookContainer.setAttribute("class", "expandeBookContainer");
          //expanding div inner HTML
          expandeBookContainer.innerHTML = `<div><img src="${element.volumeInfo.imageLinks.smallThumbnail}" alt="">
          <p>${element.volumeInfo.authors}</p>
          <a  href="">${element.volumeInfo.title}</a>
          </a></div><div>
          <h1>description</h1>
          <p><div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
           In, hic quasi ab porro, molestias modi dolorum, nam maxime accusantium quidem
            sapiente consequuntur? Blanditiis rerum, dicta voluptas atque aliquam quis iure.<p/></div>`;
          //creating elemnts
          let btnContainer = document.createElement("div");
          btnContainer.setAttribute('class', 'btnConteiner')
          let downloadBtn = document.createElement("button");
          let closeBtn = document.createElement("button");
          let link = document.createElement("a");
          //elemnts inner text
          downloadBtn.innerText = "download";
          closeBtn.innerText = "close";
          //style
          downloadBtn.style.cssText = "border-radius: 5px;";
          closeBtn.style.cssText = "border-radius: 5px;";
          //changing class
          expandeBookContainer.classList.add("expandeDiv");
          ///appending
          body.append(expandeBookContainer);
          btnContainer.append(link);
          link.href = "test.pdf";
          link.setAttribute("download", "My Document");
          btnContainer.append(downloadBtn);
          btnContainer.append(closeBtn);
          expandeBookContainer.append(btnContainer);
          //close BTN event
          closeBtn.addEventListener("click", function () {
            expandeBookContainer.style.cssText = "display:none;";
          });
          //dwonload btn event
          downloadBtn.addEventListener("click", startDownload);
          async function startDownload() {
            let url = "test.pdf";
            let fileName = "book.file";
            const res = await fetch(url);
            const blob = await res.blob();
            saveAs(blob, fileName);
          }
        });
      });
    };
    data();
  }
  //viewmore link function
  viewmorw(link, container) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      container.classList.toggle("overflow-hidden");
      container.classList.toggle("h-50");
      if (this.innerHTML == "view more") {
        this.innerHTML = "view less";
      } else {
        this.innerHTML = "view more";
      }
    });
  }
}
//creating new class
let bookstore = new BOOKSTORE(
  "https://www.googleapis.com/books/v1/volumes?q=search+terms"
);
//creatin romance section
bookstore.fetchApi(document.querySelector(".romancebooksContainer"));
bookstore.viewmorw(
  document.querySelector(".romanceviewMore"),
  document.querySelector(".romancebooksContainer")
);
//creatin comedy section
bookstore.fetchApi(document.querySelector(".comedybooksContainer"));
bookstore.viewmorw(
  document.querySelector(".comedyviewMore"),
  document.querySelector(".comedybooksContainer")
);
//creatin horror section
bookstore.fetchApi(document.querySelector(".horrorbooksContainer"));
bookstore.viewmorw(
  document.querySelector(".horrorviewMore"),
  document.querySelector(".horrorbooksContainer")
);
//creating login btn elemnts
let loginuserNamePara = document.createElement("p");
let loginpasswordNamePara = document.createElement("p");
let loginuserNameInp = document.createElement("input");
let loginpasswordNameInp = document.createElement("input");
let loginbtn = document.createElement("button");
let loginDiv = document.createElement("div");
//injectin elements with text
loginuserNamePara.innerText = "USERNAME";
loginpasswordNamePara.innerText = "PASSWORD";
loginbtn.innerText = "LOG IN";
loginDiv.classList.add("none");
//append
body.append(loginDiv);
loginDiv.append(loginuserNamePara);
loginDiv.append(loginuserNameInp);
loginDiv.append(loginpasswordNamePara);
loginDiv.append(loginpasswordNameInp);
loginDiv.append(loginbtn);
//creating login btn event
document.querySelector(".login").addEventListener("click", function () {
  //changing classes
  loginDiv.classList.toggle("none");
  loginDiv.classList.toggle("expande");

  /// matching input value to local storage
  loginbtn.addEventListener("click", function () {
    let temp = JSON.parse(localStorage.getItem(`${loginuserNameInp.value}`));
    if (
      `${temp.username}` == `${loginuserNameInp.value}` &&
      `${temp.password}` == `${loginpasswordNameInp.value}`
    ) {
      loginDiv.classList.add("none");
      loginuserNameInp.value = "";
      loginpasswordNameInp.value = "";
      document.querySelector(
        ".welcome"
      ).innerHTML = `welcome back ${temp.username}!!`;
    } else {
      alert("no users found");
    }
  });
});

//creatin signin elements
let userNamePara = document.createElement("p");
let passwordNamePara = document.createElement("p");
let userNameInp = document.createElement("input");
let passwordNameInp = document.createElement("input");
let signinDiv = document.createElement("div");
//injecting elemnts with text
let btn = document.createElement("button");
userNamePara.innerText = "USERNAME";
passwordNamePara.innerText = "PASSWORD";
btn.innerText = "SIGN IN";
//appending
body.append(signinDiv);
signinDiv.append(userNamePara);
signinDiv.append(userNameInp);
signinDiv.append(passwordNamePara);
signinDiv.append(passwordNameInp);
signinDiv.append(btn);

signinDiv.classList.add("none");
//creating signin event
document.querySelector(".signin").addEventListener("click", function () {
  //changing classes
  signinDiv.classList.remove("none");
  signinDiv.classList.toggle("expande");
  //btn event
  btn.addEventListener("click", function () {
    signinDiv.classList.add("none");
    //local storage event
    if (!userNameInp.value == "" && !passwordNameInp.value == "") {
      let obj = {
        username: `${userNameInp.value}`,
        password: `${passwordNameInp.value}`,
      };
      localStorage.setItem(`${userNameInp.value}`, JSON.stringify(obj));
      console.log(obj);
    } else {
      alert("must fill all inputs");
    }
    passwordNameInp.value = "";
    userNameInp.value = "";
  });
});
