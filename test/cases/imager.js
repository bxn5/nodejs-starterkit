// module dependencies
const imager = require(`${__root}/server/services/imager`);

describe('Imager', () => {
  it('Resize an image', function() {
    let conf = config.environment.resizer;

    return imager.resize(__root + '/test/samples/images/success.jpg', conf.folder, conf.prefix)
      .then(data => {
        expect(data).to.have.property('bitmap');
        expect(data.bitmap).to.have.property('height');
        expect(data.bitmap).to.have.property('width');
        expect(data.bitmap.width).to.be.below(1001);
        expect(data.bitmap.height).to.be.below(1001);
        expect(fs.existsSync(`${__root}/${conf.folder}/${conf.prefix}success.jpg`)).to.be.true;
        expect(fs.unlinkSync(`${__root}/${conf.folder}/${conf.prefix}success.jpg`)).to.be.undefined;
      })
  });

  it('Resize with custom sizes (250px)', function() {
    let conf = config.environment.resizer;

    return imager.resize(__root + '/test/samples/images/success.jpg', conf.folder, conf.prefix, 250)
      .then(data => {
        expect(data).to.have.property('bitmap');
        expect(data.bitmap).to.have.property('height');
        expect(data.bitmap).to.have.property('width');
        expect(data.bitmap.width).to.be.below(251);
        expect(data.bitmap.height).to.be.below(251);
        expect(fs.existsSync(`${__root}/${conf.folder}/${conf.prefix}success.jpg`)).to.be.true;
        expect(fs.unlinkSync(`${__root}/${conf.folder}/${conf.prefix}success.jpg`)).to.be.undefined;
      })
  });
});