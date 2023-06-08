import React from 'react';
import { store } from '@risingstack/react-easy-state';

// const appStore = store({
//   beers: [],
//   fetchBeers(filter) {
//     appStore.isLoading = true
//     appStore.beers = [{ name: 'Awesome Beer' }]
//     appStore.isLoading = false
//   }
// })

const subMenuStore = store({ subMenu: 0 });

export default subMenuStore;
