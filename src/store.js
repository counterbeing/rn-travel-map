export default {
  state: {
    positions: [],
    places: [],
  },
  setPositions(positions) {
    this.state.positions = positions.map((position) => {
      const placeIndex = this.state.places.findIndex(place =>
        // Here we go
        place.city === position[3] && place.state === position[4],
      );
      return {
        hospital: position[0],
        job: position[1],
        shift: position[2],
        city: position[3],
        state: position[4],
        placeIndex,
      };
    });
  },
  setPlaces(places) {
    this.state.places = places;
  },
};
