const pattern = 'https://jsonplaceholder.typicode.com/posts/';
const $app = document.querySelector('.app');


const listCreate = () => {
  const $list = document.createElement('ul');
  $app.appendChild($list);
  return $list;
}

const listUpdate = ($list, id, description) => {
  const $listItem = document.createElement('li');
  $listItem.className = id;
  $listItem.innerHTML = description;
  $list.appendChild($listItem);
}

const urlsCreate = () => {
  const urlsArr = [];
  for(let i = 1; i <= 10; i++){
    urlsArr.push(`${pattern}${i}`);
  }
  return urlsArr;
}

const chain = urls => {
  while(urls.length > 0){
    const url = urls.shift();
    fetch(url).then(response => response.json())
              .then(item => bindedListUpdate(item.id, item.title))
              .then(chain(urls));
  }
}

const bindedListUpdate = listUpdate.bind(null, listCreate());

const start = () => {
  const urlsArr = urlsCreate();
  chain(urlsArr);
}

start();