// module dependencies
const mailer    = require(`${__root}/server/services/mailer`);

describe('Mailer', () => {
  it('Send a mail', function() {
    let testMail = {
      from: '<petyaroshen@gmail.com>',
      to: '<petyaroshen@gmail.com>',
      subject: faker.lorem.sentence(),
      text: faker.lorem.text(),
      html: '<b>' + faker.lorem.text() + '</b>'
    };

    return mailer.sendMail(testMail)
      .then(data =>{
        expect(data).to.have.property('response');
        expect(data.response).to.have.string('250 2.0.0 OK');
     });
  });
});
