const faker = require('faker');
const mongoose = require('mongoose');

const Grills = require('./persistence/model-grills');

function fakeGrill() {
	const base = {
		description: faker.lorem.paragraph(),
		location: '0:0',
		price: Math.round(Math.random() * 20 + 10),
	};

	const modelInfo = {};

	switch(Math.round(Math.random() * 4)) {
		case 0:
			modelInfo.model = 'Char-Boil Grill';
			modelInfo.imageurl = 'https://s7d2.scene7.com/is/image/academy/10543058?wid=100&hei=100';
			break;
		case 1:
			modelInfo.model = 'Gas BBQ Grill';
			modelInfo.imageurl = 'http://i.ebayimg.com/00/s/NTAwWDUwMA==/z/JmgAAOxy7nNTVj~s/$_3.JPG?set_id=2';
			break;
		case 2:
			modelInfo.model = 'Weber Charcoil Grill';
			modelInfo.imageurl = 'https://images-na.ssl-images-amazon.com/images/I/71CYJCS4%2BqL._SY606_.jpg';
			break;
		case 3:
			modelInfo.model = 'Barrel Charcoil Grill';
			modelInfo.imageurl = 'https://images.homedepot-static.com/productImages/cea2c0c3-a6fe-4dc9-9e76-1a7383daae3c/svn/rivergrille-barrel-grills-cg2053904-rg-64_1000.jpg';
			break;
		default:
			modelInfo.model = 'Expert Charcoal Grill';
			modelInfo.imageurl = 'https://i5.walmartimages.com/asr/fa1be18a-e37d-4387-b6bd-3c4fba36e1fa_1.a6268444b1193d23137622d8ff7c58b4.jpeg';
			break;
	}

	return Object.assign(base, modelInfo);
}

function populateDb() {
	mongoose.connection.dropDatabase();

	const grills = [];
	for(let i = 0; i < 10; i++)
		grills.push(fakeGrill());

	return Grills.insertMany(grills);
}

module.exports = populateDb;