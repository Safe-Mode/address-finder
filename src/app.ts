import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader'

import { Google } from './enums/google';
import { GoogleGeocodingData } from './types/google-geocoding';

const formEl = document.querySelector('form')!;
const addressInputEl = formEl.querySelector('#address') as HTMLInputElement;

const loader = new Loader({
  apiKey: Google.API_KEY,
  version: 'weekly'
});

const onAddressFormSubmit = (evt: Event) => {
  evt.preventDefault();

  const address = addressInputEl.value;

  axios
      .get<GoogleGeocodingData>(
          `${ Google.API_ENDPOINT }json?address=${ encodeURI(address) }&key=${ Google.API_KEY }`
      )
      .then(({data}) => {
        if (data.status !== 'OK') {
          throw new Error('Could not fetch location');
        }

        const coordinates = data.results[0].geometry.location;

        loader
            .load()
            .then(() => {
              const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: coordinates,
                zoom: Google.ZOOM_LEVEL
              });

              new google.maps.Marker({
                position: coordinates,
                map
              });
            });
      })
      .catch((error) => {
        alert(error.message)
      });
};

formEl.addEventListener('submit', onAddressFormSubmit);
