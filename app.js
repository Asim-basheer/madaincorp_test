let userLists = document.querySelector('.users__lists');
let buttons = document.querySelectorAll('.btn');

const getUsers = () => {
  fetch(
    `http://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true`
  )
    .then((response) => response.json())

    .then((data) => {
      // loop for each button to make click events
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const afterFilter = data.filter(
            (user) => user.category === btn.dataset.category
          );

          // empty the lists parent to display filtered data
          userLists.innerHTML = '';
          fetchData(afterFilter);
        });
      });

      fetchData(data);

      // function to get the data if there are changed with the filter it will display by category
      function fetchData(userData) {
        userData.forEach((user) => {
          // create element to display
          let userList = document.createElement('div');
          let userName = document.createElement('div');
          let h3 = document.createElement('h3');
          let span = document.createElement('span');
          let p = document.createElement('p');

          // the content that fetched from api
          let spanContent = document.createTextNode(user.category);
          let pContent = document.createTextNode(`${user.fname} ${user.lname}`);
          let h3Content = document.createTextNode(
            `${user.fname.slice(0, 1)}${user.lname.slice(0, 1)}`
          );

          // add the content to the elements
          h3.appendChild(h3Content);
          p.appendChild(pContent);
          span.appendChild(spanContent);

          // add classes to the elements
          userList.classList.add('users__list');
          userName.classList.add('users__name');
          span.classList.add('category-btn');
          span.classList.add('category-btn--tag');

          // add the children inside the parent
          userList.appendChild(userName);
          userName.appendChild(h3);
          userName.appendChild(p);
          userList.appendChild(span);

          // add an element to the parent list element
          userLists.appendChild(userList);
        });
      }
    });
};

getUsers();
