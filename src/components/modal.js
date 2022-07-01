export {addCardByForm, editProfile}

function addCardByForm(evt) {
  evt.preventDefault();

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addToContainer(placesGrid, cardPlaceName, cardPlaceLink, cardConfig);

  closePopup(placeAddPopup);
  evt.target.reset();
}

function editProfile(evt) {
  evt.preventDefault();

  const inputName = profileInputName.value
  const inputDesc = profileInputDesc.value

  profileInputName.setAttribute('value', inputName);
  profileNameElement.textContent = inputName;
  profileInputDesc.setAttribute('value', inputDesc);
  profileDescElement.textContent = inputDesc;

  closePopup(profileEditPopup);
  evt.target.reset();
}
