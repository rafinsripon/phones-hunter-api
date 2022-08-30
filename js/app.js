//-----------Phone Practice----------------//
const loadPhones = async (searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    loadDisplayPhone(data.data);
}
//-------------Display All Phones--------------//
const loadDisplayPhone = phones =>{
    console.log(phones);
    const phonesContainer = document.getElementById('phones_container');
    phonesContainer.innerHTML = '';
    //----Display No Phone Validation & only 20 phone get display Show----//
    const noPhoneMeg = document.getElementById('no_found_meg');
    if(phones.length === 0){
        noPhoneMeg.classList.remove('d-none');
    }else{
        noPhoneMeg.classList.add('d-none');
    }

    phones = phones.slice(0, 10);
    phones.forEach(phone => {
        // console.log(phone);
        const {brand, image, phone_name, slug} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card h-100 p-3">
            <img class="img-fluid" src="${image}" class="card-img-top" alt="Img Not Found">
            <div class="card-body">
            <h3 class="card-title fw-bold">${phone_name}</h3>
            <h5 class="card-title fw-bold">${brand}</h5>
            <p class="card-title fs-5">${slug}</p>
            <button onclick="loadPhoneDetails('${slug}')" class="px-5 py-2 mt-4" data-bs-toggle="modal" data-bs-target="#datailsModal">Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //Stop Loader
    toggleSpiners(false);
}
//--------SearchField Enter common Funtions---------//
    const processEnterSearch = () =>{
        toggleSpiners(true)
        const searchField = document.getElementById('search_field');
        const searchFieldText = searchField.value;
        loadPhones(searchFieldText);
    }
//-----------------SearchField------------------//
//start loader
//Search Field
document.getElementById('btn_search').addEventListener('click', function(){
    processEnterSearch(10);

})
//---------------Enter Even Handler-------------//
document.getElementById('search_field').addEventListener('keypress', function(e){
    console.log(e.key)
    if(e.key === 'Enter'){
        processEnterSearch(10);
    }
})
//---------------Loader Handler-------------//
const toggleSpiners = isLoding =>{
    const loaderId = document.getElementById('loader');
    if(isLoding){
        loaderId.classList.remove('d-none');
    }else{
        loaderId.classList.add('d-none');
    }
}
//--------------- Ditails Phones -------------//
const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    loadDisplayDetails(data.data)
}
const loadDisplayDetails = detail =>{
    console.log(detail);
    const {name, releaseDate, image, mainFeatures} = detail;
    const {chipSet, memory, storage, sensors} = mainFeatures;
    const modalTitle = document.getElementById('datailsModalLabel')
    modalTitle.innerText = name;
    const phoneDetails = document.getElementById('phone_details')
    phoneDetails.innerHTML =`
    <img src="${image}" alt="Img Not Found">
    <p class="fw-bold mt-3" >Release Date: ${releaseDate}</p>
    <ol>
    <li>chipSet: ${memory}</li>
    <li>chipSet: ${storage}</li>
    <li>chipSet: ${chipSet}</li>
    <li>chipSet: ${sensors[0]}</li>
    <li>chipSet: ${sensors[1]}</li>
    <li>chipSet: ${sensors[3]}</li>
    </ol>
    `;
} 
loadPhones('apple');













