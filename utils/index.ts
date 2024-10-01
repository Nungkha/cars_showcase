// const fetch = require('node-fetch');

import { CarProps, FilterProps } from "@/types";

// const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';
// const options = {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': 'ad12daac15mshee859b55611bb05p198cc9jsndf9d05a44d65',
//     'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


export async function fetchCars(filters: FilterProps) {

    const {year, model, limit, fuel, manufacturer} = filters;

    const headers= {
        'x-rapidapi-key': 'ad12daac15mshee859b55611bb05p198cc9jsndf9d05a44d65',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
        }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&manufacturer=${manufacturer}&year=${year}&limit=${limit}&fuel_type=${fuel}`, 
        {
        headers: headers, 
    });

    const result = await response.json();

    return result;
}


export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');

    const {make, year, model} = car;

    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '')
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`
}


export const updateSearchParams = (type:string, value:string) => {
      // get current search parameter or URL
      const searchParams = new URLSearchParams(window.location.search);

// Updates the specified query parameter (e.g., "limit") with the new value
      searchParams.set(type, value);
  
      // Constructs the new path with the updated query parameters
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;

      return newPathName;
}