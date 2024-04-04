const big = (cities) => cities.filter((city) => city.population > 100000);
const small = (cities) => cities.filter((city) => city.population < 100000);

export { big, small };
