const faker = require('faker');

// Generate a random event
const generateRandomEvent = () => {
  const event = {
    id: faker.random.number(),
    name: faker.company.companyName(),
    person: faker.name.findName(),
    phone_number: faker.phone.phoneNumber(),
    date: faker.date.future(),
    time: faker.time.recent(),
    location: faker.address.streetAddress()
  };

  return event;
};

// Generate sample JSON data
const generateSampleData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const event = generateRandomEvent();
    data.push(event);
  }
  return data;
};

// Generate 5 sample events
const sampleEvents = generateSampleData(5);
console.log(sampleEvents);