var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

// var elIdish = $_('.idish');
// var elButton = $_('button', elIdish);

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement = function (element, elementClass, text) {
  var newElement = document.createElement(element);

  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }

  if (text) {
    newElement.textContent = text;
  }

  return newElement;
};


var contactArray = [];
var relationArray = [];

var elForm = $_('.js-contact-form');
var elName = $_('.js-contact-form__name-input');
var elRelationship = $_('.js-contact-form__relationship-input');
var elNumber = $_('.js-contact-form__phone-input');
var elList = $_('.js-contacts');
var elDatalist = document.querySelector('#relationships-list');
elName.focus();


elForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  /* ==============  IS INVALID  =================== */
  elNumber.classList.remove('is-invalid');
  for (var i = 0; i < contactArray.length; i++){
    if (contactArray[i].number === elNumber.value){
      elNumber.classList.add('is-invalid');
      return;
    }
  }

  contactArray.push({
    text: elName.value,
    reletion: elRelationship.value,
    number: elNumber.value
  });

  /* ========  Creat Option  ========== */
  if(!relationArray.includes(elRelationship.value)) {
    relationArray.push(elRelationship.value);
  }
  elDatalist.innerHTML = '';
  for(var i = 0; i < relationArray.length; i++) {
    var elOption = document.createElement('option');
    elOption.value = relationArray[i];
    elOption.textContent = relationArray[i];
    elDatalist.appendChild(elOption);
  }

  elList.innerHTML = '';
  var elItemsFragment = document.createDocumentFragment();
  var i = 0;

  for(var i = 0; i < contactArray.length; i++) {

    var listItem = createElement('li', 'list-group-item js-contact');
    var contactTitle = createElement('h3', 'h5 text-truncate js-contact__name');
    contactTitle.textContent = contactArray[i].text;
    var btnDel = createElement('button', 'btn btn-sm btn-danger', 'X');
    btnDel.dataset.id = i;
    var relativeness = createElement('p', 'small mb-1 js-contact__relationship');
    relativeness.textContent = contactArray[i].reletion;
    var phoneNumber = createElement('a', 'js-contact__phone');
    phoneNumber.textContent = contactArray[i].number;
    phoneNumber.href = `tel: ${contactArray[i].number}`;
    var div = createElement('div', 'd-flex justify-content-between');

    div.appendChild(contactTitle);
    div.appendChild(btnDel);
    listItem.appendChild(div);
    listItem.appendChild(relativeness);
    listItem.appendChild(phoneNumber);
    elItemsFragment.appendChild(listItem);

    elName.focus();
    elName.value = '';
    elRelationship.value = '';
    elNumber.value = '';
  }
  elList.appendChild(elItemsFragment);
});


/* ========================================================= */

elList.addEventListener('click', function(evt) {

  if(evt.target.matches('.btn-danger')){
    contactArray.splice(evt.target.dataset.id, 1);
  }


  var elItemsFragment = document.createDocumentFragment();
  var i = 0;

  elList.innerHTML = '';
  for(var i = 0; i < contactArray.length; i++) {

    var listItem = createElement('li', 'list-group-item js-contact');
    var contactTitle = createElement('h3', 'h5 text-truncate js-contact__name');
    contactTitle.textContent = contactArray[i].text;
    var btnDel = createElement('button', 'btn btn-sm btn-danger', 'X');
    btnDel.dataset.id = i;
    var relativeness = createElement('p', 'small mb-1 js-contact__relationship');
    relativeness.textContent = contactArray[i].reletion;
    var phoneNumber = createElement('a', 'js-contact__phone');
    phoneNumber.textContent = contactArray[i].number;
    phoneNumber.href = `tel: ${contactArray[i].number}`;
    var div = createElement('div', 'd-flex justify-content-between');

    div.appendChild(contactTitle);
    div.appendChild(btnDel);
    listItem.appendChild(div);
    listItem.appendChild(relativeness);
    listItem.appendChild(phoneNumber);
    elItemsFragment.appendChild(listItem);

    elName.focus();
    elName.value = '';
    elRelationship.value = '';
    elNumber.value = '';

  }
  elList.appendChild(elItemsFragment)
  console.log(contactArray);
});