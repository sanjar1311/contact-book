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

  for(var i = 0; i < contactArray.length; i++) {
    elNumber.classList.remove('is-invalid');
    if(elNumber.value === contactArray[i].number) {
      elNumber.classList.add('is-invalid');
      console.log(`salooom`);
      return;
    }
  }
  contactArray.push({
    name: elName.value,
    rel: elRelationship.value,
    number: elNumber.value
  });


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
  for(var i = 0; i < contactArray.length; i++) {

    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    var nameTitle = document.createElement('h3');
    nameTitle.classList.add('h5','text-truncate');
    nameTitle.textContent = contactArray[i].name;

    var relation = document.createElement('p');
    relation.classList.add('small', 'mb-1');
    relation.textContent = contactArray[i].rel;

    var numberLink = document.createElement('a');
    numberLink.href = `tel: ${contactArray.number}`;
    numberLink.textContent = contactArray[i].number;

    listItem.appendChild(nameTitle);
    listItem.appendChild(relation);
    listItem.appendChild(numberLink);

    elList.appendChild(listItem);
  }
  elName.focus();
  elName.value = '';
  elRelationship.value = '';
  elNumber.value = '';
});


//  <li class="list-group-item js-contact">
//    <h3 class="h5 text-truncate js-contact__name">Lorem ipsum dolo</h3>
//    <p class="small mb-1 js-contact__relationship">Qarindosh</p>
//    <a href="tel:+998909213711" class="js-contact__phone">+998909213711</a>
//  </li>