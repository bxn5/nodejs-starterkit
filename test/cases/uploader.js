describe('File uploader', () => {
  it('Upload image', done => {
    request(`localhost:${port}`)
      .post('/upload/image')
      .attach('image', __root + '/test/samples/images/success.jpg')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.property('path');
        expect(fs.existsSync(res.body.path)).to.be.true;
        expect(fs.unlinkSync(res.body.path)).to.be.undefined;
      })
      .end(done);
  });

  it('Too big size', done => {
    request(`localhost:${port}`)
      .post('/upload/image')
      .attach('image', __root + '/test/samples/images/big_size.jpg')
      .expect(400)
      .expect(res => {
        expect(res.body.error.message).to.be.equal(vars.multer.size)
      })
      .end(done);
  });

  it('Unsupported format', done => {
    request(`localhost:${port}`)
      .post('/upload/image')
      .attach('image', __root + '/test/samples/files/test.txt')
      .expect(400)
      .expect(res => {
        expect(res.body.error.message).to.be.equal(vars.multer.formats)
      })
      .end(done);
  });
});