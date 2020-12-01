const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, idx) => {
      if (selectedSeats.indexOf(idx) > -1) {
        seat.classList.add('selected');
      }
    })
  } 
  const selectedMovieIdx = localStorage.getItem('selectedMovieIdx');
  if (selectedMovieIdx !== null) {
    movieSelect.selectedIndex = selectedMovieIdx;
  }
}
populateUI()

let ticketPrice = parseInt(movieSelect.value);

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIdx = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIdx));
  
  
  const selectedSeatsCounts = selectedSeats.length;
  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
}

const setMovieData = (idx, price) => {
  localStorage.setItem('selectedMovieIdx', idx);
  localStorage.setItem('selectedPrice', price);
};

// movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

// seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
})

// inital count and total set
updateSelectedCount();